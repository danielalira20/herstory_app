import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Heart, Reply, Plus, Search, Users, Trash} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import headerImage from "@/assets/herstory-header.jpg";
import {supabase} from "@/lib/supabaseClient";
import { giveForumBadge } from "@/lib/badges";

const EllaDice = () => {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [forumPosts, setForumPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  

  const categories = ["Todos", "General","Trabajo", "Emprendimiento", "Bienestar", "Familia", "Educación"];
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

useEffect(() => {
  const fetchUser = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser);
  };

  fetchUser();
}, []);

 useEffect(() => {
  fetchPosts();

   const channel = supabase.channel("realtime-foro")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "foro" },
      (payload) => {
        setForumPosts(prev => [payload.new, ...prev]);
      }
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "foro" },
      (payload) => {
        setForumPosts(prev => prev.map(p => p.id === payload.new.id ? payload.new : p));
      }
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "foro" },
      (payload) => {
        setForumPosts(prev => prev.filter(p => p.id !== payload.old.id));
      }
    )

    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "respuestas" },
      (payload) => {
        // Cuando se agrega una respuesta, recargamos solo el post afectado
        setForumPosts(prev =>
          prev.map(p =>
            p.id === payload.new.post_id
              ? { ...p, respuestas: [...(p.respuestas || []), payload.new] }
              : p
          )
        );
      }
    )
    .subscribe();

    return () => { supabase.removeChannel(channel);}; 
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("foro")
      .select("*, respuestas(*)")
      .order("fecha", { ascending: false });
    if (!error) setForumPosts(data);
  };

  // Publicar un nuevo post
  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !newPostTitle.trim()) return;

    const { error } = await supabase.from("foro").insert([{
      title: newPostTitle,
      mensaje: newPost,
      category: newPostCategory,
      usuario_id: user?.id || null,
      anonimo: !user,
      reportes: 0
    }]);

    if (!error) {
      setNewPost("");
      setNewPostTitle("");

      //insgnia
       if (user?.id) {
        console.log("Intentando asignar insignia al usuario:", user.id);
      await giveForumBadge(user.id);
    }

      toast({
        title: "¡Post publicado!",
        description: "Tu mensaje ha sido compartido de manera anónima con la comunidad.",
      });
      fetchPosts();
    }

   
  };

  // Reportar mensaje
  const handleReport = async (post) => {
    const nuevosReportes = post.reportes + 1;

    if (nuevosReportes >= 5) {
      await supabase.from("foro").delete().eq("id", post.id);

        toast({
      title: "Post eliminado",
      description: "Este post ha superado el número máximo de reportes y ha sido eliminado.",
      variant: "destructive",
    });

    } else {
      await supabase.from("foro").update({ reportes: nuevosReportes }).eq("id", post.id);
       toast({
      title: "Reporte enviado",
      description: `Has reportado este post. Total de reportes: ${nuevosReportes}`,
      variant: "default",
    });
    }

    fetchPosts();
  };


    // Eliminar post o respuesta (solo propietario)
  const handleDelete = async (table, id) => {
    await supabase.from(table).delete().eq("id", id);
    fetchPosts();
  };

  // Filtrar posts por búsqueda y categoria 
  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.mensaje.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;

  
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={headerImage} 
          alt="HerStory Header" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Ella Dice</h1>
            <p className="text-lg italic">Foro anónimo de nuestra comunidad</p>
          </div>
        </div>
      </div>

      <Navbar />

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{forumPosts.length}</p>
                <p className="text-sm text-muted-foreground">Miembros activos</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-secondary/10 rounded-full">
                <MessageCircle className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{forumPosts.length}</p>
                <p className="text-sm text-muted-foreground">Conversaciones</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-accent/10 rounded-full">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{forumPosts.length}</p>
                <p className="text-sm text-muted-foreground">Apoyos compartidos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Nuevo Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Nuevo Post (Anónimo)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewPost} className="space-y-4">
                  <Input
                    placeholder="Título de tu post"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Comparte tu experiencia, pregunta o reflexión..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    required
                    className="min-h-24"
                  />

                   {/* Menú desplegable de categorías */}
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm bg-white text-gray-800"
                    required
                  >
                    {categories
                      .filter((c) => c !== "Todos")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>

                  <Button type="submit" className="w-full">
                    Publicar Anónimo
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Categorías */}
            <Card>
              <CardHeader>
                <CardTitle>Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main */}
          <div className="lg:col-span-3 space-y-6">
            {/* Buscar */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar en el foro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                             {post.anonimo ? "A" : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{post.anonimo ? "Anónim@" : "Usuario"}</p>
                          <p className="text-sm text-muted-foreground">{new Date(post.fecha).toLocaleString()}</p>
                        </div>
                      </div>

                       <div className="flex items-center space-x-2">
                        {user?.id === post.usuario_id && (
                          <Button variant="destructive" size="sm" onClick={() => handleDelete("foro", post.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}

                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                     </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.mensaje}</p>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-"
                         onClick={async () => {
                          if (likedPosts.has(post.id)) return; // ya dio like, no hacer nada

                            const nuevosLikes = (post.likes || 0) + 1;

                            await supabase.from("foro").update({ likes: nuevosLikes }).eq("id", post.id);

                          // Actualizar estado local para reflejar el cambio de inmediato
                          setForumPosts((prev) =>
                            prev.map((p) => (p.id === post.id ? { ...p, likes: nuevosLikes } : p))
                          );

                          setLikedPosts((prev) => new Set(prev).add(post.id));
                        }}

                         
                      >
                       <Heart
    className={`h-5 w-5 transition-colors duration-200 ${
      likedPosts.has(post.id) ? "text-red-500" : "text-gray-400 hover:text-red-400"
    }`}
  />
  <span className="font-medium">{post.likes || 0}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        {post.respuestas?.length || 0} respuestas
                      </Button>

                       <Button
                        onClick={() => handleReport(post)}
                        className="w-fit"
                      >
                        🚨 Reportar ({post.reportes})
                      </Button>
                    </div>
                      {/* Respuestas */}
                    <div className="ml-6 space-y-2">
                      {post.respuestas?.map((resp) => (
                        <div key={resp.id} className="border-l pl-4 py-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-semibold">{resp.anonimo ? "Anónim@" : "Usuario"}</p>
                              <p className="text-sm text-muted-foreground">{new Date(resp.fecha).toLocaleString()}</p>
                              <p>{resp.mensaje}</p>
                            </div>
                            {user?.id === resp.usuario_id && (
                              <Button variant="destructive" size="sm" onClick={() => handleDelete("respuestas", resp.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                     <form
                          className="mt-2 flex flex-col space-y-2"
                          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();

                            // Tomar el valor del textarea usando FormData
                            const form = e.currentTarget;
                            const formData = new FormData(form);
                            const mensaje = formData.get("mensaje")?.toString().trim();
                            if (!mensaje) return;

                            await supabase.from("respuestas").insert([{
                              post_id: post.id,
                              mensaje,
                              usuario_id: user?.id || null,
                              anonimo: !user,
                            }]);

                            form.reset(); // Ahora sí TypeScript sabe que es un HTMLFormElement
                            fetchPosts();
                          }}
                        >
                          <Textarea name="mensaje" placeholder="Escribe tu respuesta..." className="min-h-16" />
                          <Button type="submit" size="sm" className="w-fit">Responder</Button>
                        </form>

                       {/* Botón de Eliminar si es del usuario */}
                      {!post.anonimo && post.usuario_id === user?.id && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            await supabase.from("foro").delete().eq("id", post.id);
                            fetchPosts();
                            toast({
                              title: "Post eliminado",
                              description: "Tu mensaje ha sido eliminado correctamente.",
                            });
                          }}
                        >
                          Eliminar
                        </Button>
                      )}

                      

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EllaDice;
