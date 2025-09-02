import samplePerson1 from "@/assets/sample-person-1.jpg";
import samplePerson2 from "@/assets/sample-person-2.jpg";
import samplePerson3 from "@/assets/sample-person-3.jpg";
import samplePerson4 from "@/assets/sample-person-4.jpg";
import samplePerson5 from "@/assets/sample-person-5.jpg";

export interface Person {
  id: string;
  name: string;
  age: number;
  estado: string;
  fechaDesaparicion: string;
  foto: string;
  caracteristicas: string;
  contacto?: string;
  telefono?: string;
  ultimaVez?: string;
  estatura?: string;
  peso?: string;
  ojos?: string;
  cabello?: string;
}

export const mockPersons: Person[] = [
  {
    id: "1",
    name: "María González López",
    age: 28,
    estado: "Ciudad de México",
    fechaDesaparicion: "15 de enero, 2024",
    foto: samplePerson1,
    caracteristicas: "Estatura media, cabello largo castaño, complexión delgada. Llevaba blusa azul y pantalón de mezclilla.",
    contacto: "Familia González",
    telefono: "55-1234-5678",
    ultimaVez: "Colonia Roma Norte, Ciudad de México",
    estatura: "1.65 m",
    peso: "55 kg",
    ojos: "Cafés",
    cabello: "Castaño largo"
  },
  {
    id: "2",
    name: "Ana Patricia Ruiz",
    age: 22,
    estado: "Jalisco",
    fechaDesaparicion: "3 de febrero, 2024",
    foto: samplePerson2,
    caracteristicas: "Joven de complexión delgada, cabello ondulado. Estudiante universitaria, muy sociable.",
    contacto: "Familia Ruiz Mendoza",
    telefono: "33-9876-5432",
    ultimaVez: "Universidad de Guadalajara, campus centro",
    estatura: "1.60 m",
    peso: "50 kg",
    ojos: "Verdes",
    cabello: "Castaño ondulado"
  },
  {
    id: "3",
    name: "Carmen Morales Silva",
    age: 35,
    estado: "Nuevo León",
    fechaDesaparicion: "28 de diciembre, 2023",
    foto: samplePerson3,
    caracteristicas: "Madre de familia, complexión media. Trabajaba como enfermera en hospital local.",
    contacto: "Esposo - Roberto Morales",
    telefono: "81-5555-1234",
    ultimaVez: "Hospital General, Monterrey",
    estatura: "1.68 m",
    peso: "65 kg",
    ojos: "Negros",
    cabello: "Negro, corte bob"
  },
  {
    id: "4",
    name: "Lucía Fernández Torres",
    age: 19,
    estado: "Veracruz",
    fechaDesaparicion: "10 de marzo, 2024",
    foto: samplePerson4,
    caracteristicas: "Estudiante de preparatoria, muy alegre y extrovertida. Le gusta la música y el baile.",
    contacto: "Padres - Familia Fernández",
    telefono: "229-888-9999",
    ultimaVez: "Centro de Veracruz, cerca de la plaza principal",
    estatura: "1.62 m",
    peso: "52 kg",
    ojos: "Cafés",
    cabello: "Negro largo y liso"
  },
  {
    id: "5",
    name: "Rosa Elena Vázquez",
    age: 31,
    estado: "Chihuahua",
    fechaDesaparicion: "22 de enero, 2024",
    foto: samplePerson5,
    caracteristicas: "Profesionista en sistemas, muy responsable. Siempre mantiene contacto con su familia.",
    contacto: "Hermana - Patricia Vázquez",
    telefono: "614-777-3333",
    ultimaVez: "Oficinas del centro de Chihuahua",
    estatura: "1.67 m",
    peso: "58 kg",
    ojos: "Cafés",
    cabello: "Castaño con mechas"
  },
  {
    id: "6",
    name: "Daniela Ramírez Castro",
    age: 26,
    estado: "Puebla",
    fechaDesaparicion: "5 de febrero, 2024",
    foto: samplePerson1,
    caracteristicas: "Maestra de primaria, muy querida por sus alumnos. Complexión delgada, siempre sonriente.",
    contacto: "Familia Ramírez",
    telefono: "222-444-6666",
    ultimaVez: "Escuela Primaria Benito Juárez, Puebla",
    estatura: "1.58 m",
    peso: "48 kg",
    ojos: "Verdes",
    cabello: "Rubio corto"
  },
  {
    id: "7",
    name: "Alejandra Herrera Díaz",
    age: 24,
    estado: "Guanajuato",
    fechaDesaparicion: "18 de enero, 2024",
    foto: samplePerson2,
    caracteristicas: "Artista y pintora, muy creativa. Le encanta viajar y conocer nuevos lugares.",
    contacto: "Novio - Carlos Herrera",
    telefono: "473-222-8888",
    ultimaVez: "Centro histórico de Guanajuato",
    estatura: "1.64 m",
    peso: "54 kg",
    ojos: "Azules",
    cabello: "Pelirrojo rizado"
  },
  {
    id: "8",
    name: "Mónica Jiménez Flores",
    age: 29,
    estado: "Yucatán",
    fechaDesaparicion: "12 de marzo, 2024",
    foto: samplePerson3,
    caracteristicas: "Doctora pediatra, muy dedicada a su trabajo. Complexión media, siempre bien arreglada.",
    contacto: "Colegio Médico de Yucatán",
    telefono: "999-555-7777",
    ultimaVez: "Hospital Regional de Mérida",
    estatura: "1.66 m",
    peso: "60 kg",
    ojos: "Cafés",
    cabello: "Negro recogido"
  }
];