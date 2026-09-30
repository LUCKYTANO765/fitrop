const fitropData = {
  "pavilions": [
    {
      "id": "pav-agro",
      "code": "PABELLÓN 01",
      "name": "Agroindustria, Fruticultura y Agroecología",
      "sector": "Agroindustria",
      "image": "assets/img/pav_agro.jpg",
      "color": "#059669",
      "description": "Cadena de valor agroindustrial del trópico: banano de exportación, piña ecológica, cítricos, palmito en conserva, café de altura y mieles de monte.",
      "surface": "4,500 m² cubiertos",
      "standsCount": 48,
      "location": "Sector Norte • Acceso A",
      "exhibitorProfile": "Empresas exportadoras, cooperativas agrícolas y plantas procesadoras."
    },
    {
      "id": "pav-emobility",
      "code": "PABELLÓN 02",
      "name": "Electromovilidad y Maquinaria Agrícola",
      "sector": "Tecnología y Energía",
      "image": "assets/img/machinery.jpg",
      "color": "#0284c7",
      "description": "Soluciones de mecanización limpia: tractores solares fotovoltaicos, vehículos utilitarios 4x4, trimóviles de carga y sistemas de almacenamiento con baterías de litio.",
      "surface": "6,000 m² (Pabellón y Pista de Pruebas)",
      "standsCount": 36,
      "location": "Explanada Tecnológica • Acceso B",
      "exhibitorProfile": "Fabricantes de maquinaria, proveedores de baterías de litio, convertidores e ingeniería solar."
    },
    {
      "id": "pav-gastronomy",
      "code": "PABELLÓN 03",
      "name": "Piscicultura e Industria Alimentaria",
      "sector": "Alimentos y Gastronomía",
      "image": "assets/img/gastronomy.jpg",
      "color": "#d97706",
      "description": "Piscicultura intensiva y sustentable de especies nativas (surubí, pacú, tambaquí), procesamiento cárnico, cacao amazónico de origen y bebidas naturales.",
      "surface": "3,800 m²",
      "standsCount": 42,
      "location": "Ribera San Mateo • Acceso C",
      "exhibitorProfile": "Centros piscícolas certificados, plantas de envasado al vacío y procesadores de alimentos."
    },
    {
      "id": "pav-technology",
      "code": "PABELLÓN 04",
      "name": "Comercio Internacional, Riego y Servicios",
      "sector": "Negocios y Servicios",
      "image": "assets/img/pav_technology.jpg",
      "color": "#6d28d9",
      "description": "Ruedas de negocios internacionales, tecnología satelital de agricultura de precisión, sistemas de bombeo solar, financiamiento verde y logística de frío.",
      "surface": "3,200 m²",
      "standsCount": 30,
      "location": "Ala Este • Centro de Negocios",
      "exhibitorProfile": "Cámaras binacionales, entidades financieras, empresas de telecomunicaciones y logística."
    },
    {
      "id": "pav-indigenous",
      "code": "PABELLÓN 05",
      "name": "Producción Comunitaria y Naciones Indígenas",
      "sector": "Comunidades y Artesanía",
      "image": "assets/img/pav_indigenous.jpg",
      "color": "#be185d",
      "description": "Producción forestal no maderable de las naciones indígenas Yuracaré y Yuqui: textiles en corteza vegetal, aceites esenciales, bioartesanía y agroturismo comunitario.",
      "surface": "2,000 m²",
      "standsCount": 24,
      "location": "Área Ecológica • Acceso D",
      "exhibitorProfile": "Asociaciones indígenas comunitarias, emprendimientos de bioeconomía y artesanía sustentable."
    }
  ],
  "exhibitors": [
    {
      "id": 1,
      "name": "Banatrop Bolivia S.A.",
      "initials": "BT",
      "category": "agro",
      "pavilion": "Pabellón Agroindustrial (01)",
      "standNumber": "A-12",
      "badge": "Exportador Certificado",
      "highlight": "Producción y exportación de banano Cavendish con certificación GlobalG.A.P. y derivados deshidratados.",
      "description": "Consorcio exportador conformado por productores de Chimoré y Shinahota, con volumen anual superior a 6.5 millones de cajas para mercados del Cono Sur y Europa.",
      "products": [
        "Banano Cavendish de Exportación",
        "Harina de Plátano Grado Industrial",
        "Snacks Deshidratados"
      ],
      "location": "Chimoré, Cochabamba",
      "contact": {
        "phone": "+591 4 4134000",
        "whatsapp": "+591 71720101",
        "email": "ventas@banatrop.bo",
        "website": "https://banatrop.bo"
      }
    },
    {
      "id": 2,
      "name": "VoltAgro Bolivia Maquinaria",
      "initials": "VA",
      "category": "emobility",
      "pavilion": "Pabellón Electromovilidad (02)",
      "standNumber": "E-01",
      "badge": "Tecnología Limpia",
      "highlight": "Fabricación y adaptación de tractores agrícolas 100% eléctricos con sistemas de soporte solar fotovoltaico.",
      "description": "Ingeniería nacional especializada en electromovilidad agropecuaria. Equipamiento diseñado específicamente para alta humedad ambiental y suelos arcillosos del trópico.",
      "products": [
        "Tractor Eléctrico VoltTractor T80",
        "Kits de Electrificación para Bombas de Pozo",
        "Inversores de Alta Protección IP67"
      ],
      "location": "Villa Tunari, Cochabamba",
      "contact": {
        "phone": "+591 4 4138120",
        "whatsapp": "+591 72288331",
        "email": "contacto@voltagro.bo",
        "website": "https://voltagro.bo"
      }
    },
    {
      "id": 3,
      "name": "Complejo Piscícola Shinahota",
      "initials": "CPS",
      "category": "gastronomy",
      "pavilion": "Pabellón Piscícola (03)",
      "standNumber": "G-08",
      "badge": "Acuicultura Certificada",
      "highlight": "Producción controlada y faenado técnico de pacú, tambaquí y surubí envasados al vacío con trazabilidad sanitaria.",
      "description": "Planta modelo de procesamiento acuícola con capacidad de 15 toneladas mensuales bajo normas SENASAG de inocuidad y control biológico.",
      "products": [
        "Filete de Surubí Desespinado IQF",
        "Costillas de Pacú Envasadas al Vacío",
        "Tambaquí Entero Eviscerado"
      ],
      "location": "Shinahota, Cochabamba",
      "contact": {
        "phone": "+591 4 4135544",
        "whatsapp": "+591 71490212",
        "email": "comercial@piscicolashinahota.com",
        "website": "https://piscicolashinahota.com"
      }
    },
    {
      "id": 4,
      "name": "YLB División Baterías Industriales",
      "initials": "YLB",
      "category": "emobility",
      "pavilion": "Pabellón Electromovilidad (02)",
      "standNumber": "E-04",
      "badge": "Litio Boliviano",
      "highlight": "Celdas y módulos de almacenamiento de litio ferrofosfato (LFP) diseñados para maquinaria agrícola y tracción pesada.",
      "description": "Empresa pública estratégica presentando soluciones de almacenamiento energético descentralizado para el sector productivo rural.",
      "products": [
        "Módulos de Batería LFP 48V y 72V",
        "Estaciones Móviles de Carga Solar Off-Grid",
        "Sistemas BESS para Fincas"
      ],
      "location": "Complejo Industrial YLB / Stand Institucional",
      "contact": {
        "phone": "+591 2 2154400",
        "whatsapp": "+591 79900112",
        "email": "agro.litio@ylb.gob.bo",
        "website": "https://ylb.gob.bo"
      }
    },
    {
      "id": 5,
      "name": "Asociación Agroindustrial Piña Dorada",
      "initials": "APD",
      "category": "agro",
      "pavilion": "Pabellón Agroindustrial (01)",
      "standNumber": "A-05",
      "badge": "Producción Frutícola",
      "highlight": "Cultivo y comercialización masiva de piña Cayena Lisa con estándares de dulzura superiores a 15° Brix.",
      "description": "Organización de 350 productores asociados de Entre Ríos con infraestructura de selección óptica y cadena de frío para distribución interdepartamental.",
      "products": [
        "Piña Fresca Calibres 6, 7 y 8",
        "Pulpa Concentrada Aséptica",
        "Derivados y Almíbares Industriales"
      ],
      "location": "Entre Ríos, Cochabamba",
      "contact": {
        "phone": "+591 4 4139988",
        "whatsapp": "+591 73789012",
        "email": "ventas@pinadorada.bo",
        "website": "https://pinadorada.bo"
      }
    },
    {
      "id": 6,
      "name": "Palmitos Industriales del Chapare",
      "initials": "PIC",
      "category": "agro",
      "pavilion": "Pabellón Agroindustrial (01)",
      "standNumber": "A-19",
      "badge": "Calidad de Exportación",
      "highlight": "Industrialización de tallo tierno de chonta cultivada bajo sistemas agroforestales sin deforestación.",
      "description": "Planta conservera con certificación HACCP e ISO 22000, exportando a Chile, Argentina, Estados Unidos y mercado interno nacional.",
      "products": [
        "Corazones de Palmito en Salmuera",
        "Palmito en Rodajas en Conserva",
        "Palmito Fresco al Vacío"
      ],
      "location": "Villa Tunari, Cochabamba",
      "contact": {
        "phone": "+591 4 4134422",
        "whatsapp": "+591 72740505",
        "email": "exportaciones@palmitochapare.bo",
        "website": "https://palmitochapare.bo"
      }
    },
    {
      "id": 7,
      "name": "E-Tropik Movilidad Eléctrica Rural",
      "initials": "ETR",
      "category": "emobility",
      "pavilion": "Pabellón Electromovilidad (02)",
      "standNumber": "E-10",
      "badge": "Cero Emisiones",
      "highlight": "Vehículos utilitarios eléctricos y trimóviles con reductora mecánica para tareas de recolección de fruta en terreno difícil.",
      "description": "Empresa automotriz boliviana enfocada en la sustitución de vehículos a combustión en faenas agrícolas mediante unidades silenciosas y de mínimo costo por kilómetro.",
      "products": [
        "Trimóvil de Carga E-Tropik 800",
        "Camioneta Utilitaria Eco-Loader TR7",
        "Carretas Eléctricas Asistidas"
      ],
      "location": "Parque Industrial Santiváñez / Agencia Trópico",
      "contact": {
        "phone": "+591 4 4298711",
        "whatsapp": "+591 70765432",
        "email": "ventas@etropik.bo",
        "website": "https://etropik.bo"
      }
    },
    {
      "id": 8,
      "name": "Industria Cacaotera Tunari",
      "initials": "ICT",
      "category": "gastronomy",
      "pavilion": "Pabellón Piscícola (03)",
      "standNumber": "G-15",
      "badge": "Cacao Fino de Aroma",
      "highlight": "Transformación de cacao silvestre nativo y criollo amazónico en coberturas y barras de chocolate fino de origen.",
      "description": "Microindustria galardonada a nivel internacional por perfiles organolépticos limpios, trabajando con comunidades recolectoras de las cuencas del Chapare.",
      "products": [
        "Pasta Pura de Cacao 100%",
        "Barras Finas de Chocolate 70%",
        "Manteca Virgen de Cacao"
      ],
      "location": "Villa Tunari, Cochabamba",
      "contact": {
        "phone": "+591 4 4134991",
        "whatsapp": "+591 71711223",
        "email": "contacto@chocolatestunari.com",
        "website": "https://chocolatestunari.com"
      }
    },
    {
      "id": 9,
      "name": "TropiDrones Agricultura de Precisión",
      "initials": "TDA",
      "category": "technology",
      "pavilion": "Pabellón Internacional (04)",
      "standNumber": "I-03",
      "badge": "Agrotecnología",
      "highlight": "Sistemas aéreos no tripulados para mapeo multiespectral de cultivos y pulverización ultra-localizada de bioinsumos.",
      "description": "Pioneros en telemetría agrícola para bananeras y cítricos en climas subtropicales, optimizando el uso de insumos en un 40%.",
      "products": [
        "Dron Agrícola de Aplicación Titan-50L",
        "Software de Mapeo de Vigor Vegetativo",
        "Estaciones Meteorológicas de Campo"
      ],
      "location": "Chimoré, Cochabamba",
      "contact": {
        "phone": "+591 4 4251000",
        "whatsapp": "+591 76987654",
        "email": "operaciones@tropidrones.bo",
        "website": "https://tropidrones.bo"
      }
    },
    {
      "id": 10,
      "name": "Consejo Indígena Yuracaré (CONIY)",
      "initials": "CY",
      "category": "indigenous",
      "pavilion": "Pabellón Cultural (05)",
      "standNumber": "C-01",
      "badge": "Bioeconomía Comunitaria",
      "highlight": "Manufactura artesanal sustentable en corteza de bibosi, biojoyería de semillas silvestres y productos de bosque vivo.",
      "description": "Representación productiva comunitaria de los territorios ribereños de los ríos Chapare e Isiboro, promoviendo el manejo forestal sostenible.",
      "products": [
        "Textiles de Fibra Vegetal de Bibosi",
        "Canastería Fina en Chuchío",
        "Bálsamos Botánicos y Aceites Esenciales"
      ],
      "location": "Territorio Indígena Yuracaré, Puerto Villarroel",
      "contact": {
        "phone": "+591 4 4136200",
        "whatsapp": "+591 74812345",
        "email": "artesanias.yuracare@gmail.com",
        "website": "https://yuracare-raices.bo"
      }
    },
    {
      "id": 11,
      "name": "BioFrutas y Esencias Amazónicas",
      "initials": "BFA",
      "category": "agro",
      "pavilion": "Pabellón Agroindustrial (01)",
      "standNumber": "A-28",
      "badge": "Agroindustria Orgánica",
      "highlight": "Procesamiento y pasteurización aséptica de pulpas congeladas de copoazú, açaí, maracuyá y camu camu.",
      "description": "Empresa con planta de congelación ultrarrápida que abastece a la industria láctea, de helados y coctelería a nivel nacional.",
      "products": [
        "Pulpa Aséptica de Copoazú 1kg",
        "Pulpa Concentrada de Açaí Grado A",
        "Concentrado de Maracuyá para Bebidas"
      ],
      "location": "Shinahota, Cochabamba",
      "contact": {
        "phone": "+591 4 4137701",
        "whatsapp": "+591 72980111",
        "email": "info@biofrutasamazonicas.bo",
        "website": "https://biofrutasamazonicas.bo"
      }
    },
    {
      "id": 12,
      "name": "BioSolar Ingeniería de Riego",
      "initials": "BSI",
      "category": "technology",
      "pavilion": "Pabellón Internacional (04)",
      "standNumber": "I-11",
      "badge": "Energía Solar",
      "highlight": "Diseño e instalación de sistemas de bombeo solar fotovoltaico directo para estanques piscícolas y riego por goteo.",
      "description": "Soluciones de ingeniería hidráulica y solar para fincas aisladas sin red eléctrica convencional, con más de 120 instalaciones operativas en el trópico.",
      "products": [
        "Bombas Solares Sumergibles Helioidales",
        "Controladores MPPT Industriales",
        "Sistemas de Oxigenación para Acuicultura"
      ],
      "location": "Villa Tunari, Cochabamba",
      "contact": {
        "phone": "+591 4 4134800",
        "whatsapp": "+591 71799887",
        "email": "proyectos@biosolar-agro.bo",
        "website": "https://biosolar-agro.bo"
      }
    }
  ],
  "electricMachinery": [
    {
      "id": "m-01",
      "name": "Tractor Agrícola VoltTractor T80 Solar",
      "category": "Tractor Pesado de Tracción Eléctrica",
      "badge": "100% Cero Emisiones",
      "image": "assets/img/machinery.jpg",
      "power": "85 HP (63 kW) Motor Asíncrono Dual",
      "battery": "Litio LFP 96 kWh con Techo Solar de 1.4 kWp Integrado",
      "range": "10 a 12 horas continuas de labor agrícola intensiva",
      "payload": "Capacidad de tiro de 3,500 kg en suelos arcillosos",
      "features": [
        "Eliminación total del consumo de diésel y emisiones de gases de efecto invernadero",
        "Panel solar bifacial integrado en cabina que aporta recarga continua durante la jornada",
        "Tracción integral 4x4 con bloqueo electrohidráulico de diferencial",
        "Toma de fuerza (TDP) eléctrica independiente de 540 / 1000 RPM",
        "Certificación IP67 en todo el tren motriz contra inundación y humedad tropical"
      ],
      "description": "Diseñado para preparación de suelos, labores de desmalezado y transporte en plantaciones bananeras y citrícolas. Reduce costos operativos en un 70% comparado con motores a combustión interna."
    },
    {
      "id": "m-02",
      "name": "Vehículo Utilitario de Carga Eco-Loader TR7",
      "category": "Transporte Utilitario Todoterreno",
      "badge": "Tracción 4x4 para Campo",
      "image": "assets/img/machinery.jpg",
      "power": "40 kW Torque Instantáneo (320 Nm)",
      "battery": "Batería Litio YLB 48 kWh con Carga Rápida Industrial",
      "range": "160 km o 14 horas de faena en campo",
      "payload": "1,200 kg en tolva basculante hidráulica",
      "features": [
        "Tolva reforzada con compuertas laterales para cajas de banano, piña y palmito",
        "Neumáticos flotantes de baja compactación de suelo para proteger la fertilidad del terreno",
        "Suspensión independiente articulada para cruce de zanjas y fango",
        "Frenos regenerativos con recuperación energética en descensos",
        "Cabina estanca protegida contra polvo y lluvia torrencial"
      ],
      "description": "Unidad utilitaria diseñada para recolección en parcelas de acceso complejo sin generar compactación destructiva en el suelo ni ruidos invasivos."
    },
    {
      "id": "m-03",
      "name": "Trimóvil de Carga Liviana MotoCargo E-Tropik 800",
      "category": "Transporte Liviano Agrícola",
      "badge": "Eficiencia Operativa",
      "image": "assets/img/machinery.jpg",
      "power": "5,000 W Motor Brushless en Eje de Tracción",
      "battery": "72V 100Ah Litio Modular Extraíble",
      "range": "90 km por ciclo de carga completo",
      "payload": "800 kg de carga útil en carrocería",
      "features": [
        "Estructura de chasis galvanizado por inmersión en caliente contra corrosión ácida tropical",
        "Caja reductora de torque para pendientes de hasta 30% con carga completa",
        "Costo de recarga estimado en menos de 4 Bolivianos en toma doméstica estándar de 220V",
        "Sistema de batería desmontable para intercambio rápido en faena"
      ],
      "description": "Vehículo de apoyo inmediato para pequeños productores. Reemplaza el transporte tradicional a gasolina, optimizando el traslado diario de racimos y cosechas."
    },
    {
      "id": "m-04",
      "name": "Dron Agrícola de Gran Capacidad Titan-X 50L",
      "category": "Sistemas Autónomos de Pulverización",
      "badge": "Agricultura de Precisión",
      "image": "assets/img/drone_agricola.jpg",
      "power": "8 Motores Eléctricos Coaxiales (18 kW Potencia Pico)",
      "battery": "Pack Inteligente 30,000 mAh con Enfriamiento Líquido",
      "range": "Cobertura de hasta 20 hectáreas operativas por hora",
      "payload": "Tanque presurizado de 50 litros para biofertilizantes",
      "features": [
        "Radar omnidireccional digital con esquiva activa de cables, palmeras y obstáculos",
        "Boquillas de atomización centrífuga regulables con gota de 50 a 500 micras",
        "Navegación autónoma satelital RTK con precisión centimétrica",
        "Monitoreo térmico y multiespectral para aplicaciones selectivas de insumos"
      ],
      "description": "Solución de aspersión aérea controlada para evitar el ingreso de maquinaria pesada en épocas de alta precipitación pluvial en el trópico."
    },
    {
      "id": "m-05",
      "name": "Camioneta Pickup Eléctrica Chachapoya EV-Truck 4x4",
      "category": "Vehículo de Carga Pesada y Enlace",
      "badge": "Litio Boliviano YLB",
      "image": "assets/img/electric_pickup.jpg",
      "power": "300 HP Dual Motor AWD (Torque Combinado 540 Nm)",
      "battery": "110 kWh Celda Sólida Litio YLB",
      "range": "420 km en ciclo mixto carretera y camino de ripio",
      "payload": "1,500 kg en caja y 3,500 kg de capacidad de remolque",
      "features": [
        "Salida eléctrica integrada de 220V y 3.6 kW para conexión de herramientas en campo",
        "Capacidad de vadeo certificada de 85 cm para cruce seguro de pasos de agua",
        "Chasis monocasco reforzado con placa de acero al boro para protección de batería",
        "Conectividad satelital y telemetría de monitoreo para flotas agropecuarias"
      ],
      "description": "Vehículo de logística pesada desarrollado para el transporte de insumos y personal técnico entre los centros productivos del trópico y las capitales de departamento."
    },
    {
      "id": "m-06",
      "name": "Sistema de Bombeo Solar Agro-Direct 15HP",
      "category": "Infraestructura Hidráulica Solar",
      "badge": "Bombeo Autónomo sin Red",
      "image": "assets/img/pav_technology.jpg",
      "power": "Motor Sumergible Eléctrico 11 kW (15 HP)",
      "battery": "Operación Directa por Arreglo Fotovoltaico de 13.2 kWp",
      "range": "Operación continua de 8 a 10 horas diarias con luz solar",
      "payload": "Caudal constante de hasta 90,000 litros/hora",
      "features": [
        "Inversor MPPT de frecuencia variable que ajusta la velocidad según la radiación",
        "Cero consumo de combustible diésel y mantenimiento mínimo sin aceites",
        "Sensores de pozo y protección de corte automático por funcionamiento en seco",
        "Control digital programable con encendido según horarios óptimos de riego"
      ],
      "description": "Equipamiento para recirculación de agua en piscinas de cría de pacú y surubí, y suministro continuo en sistemas de fertirriego para banano y piña."
    }
  ],
  "gastronomy": [
    {
      "id": "g-01",
      "name": "Surubí Amazónico a las Brasas en Hoja de Plátano",
      "category": "Piscicultura Amazónica",
      "badge": "Plato Emblema",
      "image": "assets/img/gastronomy.jpg",
      "origin": "Villa Tunari y Puerto Villarroel",
      "ingredients": "Filete seleccionado de surubí de río, adobo tradicional de cítricos silvestres, hojas de plátano ahumadas, yuca harinosa frita y reducción de maracuyá.",
      "description": "Carne blanca y magra, cocinada a fuego lento en envoltorio vegetal natural para preservar aceites esenciales y humedad. Pescado criado bajo estándares de acuicultura sustentable.",
      "pairing": "Bebida fría de frutas de estación o cerveza artesanal de maracuyá."
    },
    {
      "id": "g-02",
      "name": "Pacú de Granja Ecológica Dorado con Yuca Crocante",
      "category": "Piscicultura Amazónica",
      "badge": "Producción Certificada",
      "image": "assets/img/gastronomy.jpg",
      "origin": "Shinahota y Chimoré",
      "ingredients": "Costillar de pacú de estanques con recirculación de agua limpia, sal de roca, jugo de lima mandarino, harina de yuca tostada y plátano caramelizado.",
      "description": "Pescado de alta concentración de ácidos grasos saludables (Omega 3). Textura crocante exterior con carne suave y jugosa, servido según el recetario tradicional.",
      "pairing": "Zumo natural pasteurizado de copoazú."
    },
    {
      "id": "g-03",
      "name": "Tambaquí Asado al Horno con Hierbas del Trópico",
      "category": "Piscicultura Amazónica",
      "badge": "Especialidad Acuícola",
      "image": "assets/img/gastronomy.jpg",
      "origin": "Entre Ríos y Puerto Villarroel",
      "ingredients": "Pieza entera de tambaquí macerada en fermento de maíz, cilantro de monte, achiote silvestre, ají dulce y limón sutil cocido al horno de leña.",
      "description": "Pescado emblemático de la cuenca amazónica del Chapare, cocinado en cocción lenta con hierbas nativas que realzan su sabor limpio y fresco.",
      "pairing": "Refresco natural de carambola y jengibre."
    },
    {
      "id": "g-04",
      "name": "Palmito Tierno Fresco con Vinagreta Cítrica",
      "category": "Productos Agroforestales",
      "badge": "Exportación Agroforestal",
      "image": "assets/img/ceviche_palmito.jpg",
      "origin": "Villa Tunari",
      "ingredients": "Corte tierno de corazón de palmito cosechado en el día, tomates cherry, hojas verdes de huerto, vinagreta de miel de melipona y maracuyá.",
      "description": "Materia prima fresca directamente de los centros de recolección de Villa Tunari. Textura sedosa y dulzura natural sin aditivos de conserva.",
      "pairing": "Infusión fría de té verde con hojas de menta silvestre."
    },
    {
      "id": "g-05",
      "name": "Majadito Tradicional de Charque con Plátano Maduro",
      "category": "Gastronomía Tradicional",
      "badge": "Plato Regional",
      "image": "assets/img/gastronomy.jpg",
      "origin": "Chimoré y Puerto Villarroel",
      "ingredients": "Arroz tostado teñido con urucú natural, charque de res deshebrado en tacú de madera, plátano dulce frito, huevo de campo y yuca dorada.",
      "description": "Plato tradicional de las regiones cálidas de Cochabamba y el oriente boliviano, elaborado con productos de la agricultura familiar campesina.",
      "pairing": "Somó tradicional de maíz blanco con hielo."
    },
    {
      "id": "g-06",
      "name": "Degustación de Cacao Criollo Silvestre y Derivados",
      "category": "Industria Chocolatera",
      "badge": "Cacao Fino de Aroma",
      "image": "assets/img/pav_indigenous.jpg",
      "origin": "Villa Tunari y Chimoré",
      "ingredients": "Cacao criollo amazónico 70%, 80% y 100%, nibs tostados, cristales de sal marina y rellenos de frutas nativas.",
      "description": "Muestra técnica del potencial del cacao fino del Trópico de Cochabamba, posicionado entre los mejores granos de aroma del mundo.",
      "pairing": "Café arábica de altura o licor artesanal de cacao."
    }
  ],
  "schedule": [
    {
      "day": "Día 1 - Viernes 2 de Octubre",
      "badge": "Inauguración Oficial",
      "events": [
        {
          "time": "09:00",
          "title": "Apertura del Recinto y Recorrido de Delegaciones Comerciales",
          "place": "Pabellón Central y Accesos"
        },
        {
          "time": "11:00",
          "title": "Acto Inaugural Oficial FITROP 2026",
          "place": "Auditorio Principal de Convenciones"
        },
        {
          "time": "15:00",
          "title": "Demostración de Vuelo y Precisión de Drones Agrícolas Titan-X",
          "place": "Pabellón de Electromovilidad - Pista Abierta"
        },
        {
          "time": "19:00",
          "title": "Presentación Institucional del Consejo Indígena Yuracaré",
          "place": "Pabellón Cultural y Comunitario"
        }
      ]
    },
    {
      "day": "Día 2 - Sábado 3 de Octubre",
      "badge": "Foro de Electromovilidad",
      "events": [
        {
          "time": "10:00",
          "title": "Simposio Internacional: Almacenamiento con Baterías de Litio YLB en el Agro",
          "place": "Sala de Conferencias Chimoré"
        },
        {
          "time": "14:30",
          "title": "Pruebas Dinámicas en Terreno de Tractores y Utilitarios 4x4",
          "place": "Circuito de Pruebas de Maquinaria"
        },
        {
          "time": "17:00",
          "title": "Taller Técnico: Manejo Inocuo de la Cadena de Frío en Piscicultura",
          "place": "Pabellón Piscícola y Alimentos"
        },
        {
          "time": "20:00",
          "title": "Encuentro de Cámaras de Industria y Comercio Departamentales",
          "place": "Centro de Negocios Internacional"
        }
      ]
    },
    {
      "day": "Día 3 - Domingo 4 de Octubre",
      "badge": "Jornada Acuícola y Frutícola",
      "events": [
        {
          "time": "10:00",
          "title": "Foro Técnico: Métodos de Recirculación y Alimentación para Pacú y Tambaquí",
          "place": "Pabellón Piscícola"
        },
        {
          "time": "14:00",
          "title": "Presentación de Variedades de Banano y Piña para Mercados de Ultramar",
          "place": "Pabellón Agroindustrial"
        },
        {
          "time": "16:30",
          "title": "Mesa Redonda sobre Certificaciones de Sostenibilidad y Comercio Justo",
          "place": "Pabellón Internacional"
        },
        {
          "time": "20:30",
          "title": "Noche Cultural y Muestra de Tradiciones del Trópico",
          "place": "Explanada Central"
        }
      ]
    },
    {
      "day": "Día 4 - Domingo 18 de Octubre",
      "badge": "Ruedas de Negocios",
      "events": [
        {
          "time": "09:30",
          "title": "Inicio de Ruedas de Negocios Internacionales del Trópico",
          "place": "Pabellón Internacional (PAV-04)"
        },
        {
          "time": "15:00",
          "title": "Exhibición de Transporte Pesado Eléctrico para la Ruta Cochabamba - Santa Cruz",
          "place": "Pabellón Electromovilidad"
        },
        {
          "time": "18:00",
          "title": "Cata Técnica de Perfiles de Tostado de Cacao Amazónico",
          "place": "Sector de Agroindustria Alimentaria"
        }
      ]
    }
  ],
  "arenaInfo": {
    "name": "Escenario Central San Mateo",
    "subtitle": "Arena de Festivales y Conciertos FITROP Fest 2026",
    "capacity": "18,000 Espectadores",
    "sound": "Arreglo Line Array Digital JBL VTX y Pantallas LED 8K",
    "location": "Explanada Sur del Recinto • Acceso por Puerta 4",
    "policy": "Acceso incluido con la entrada general a la feria a partir de las 19:00 hrs. Mesas VIP disponibles para delegaciones y empresas.",
    "image": "assets/img/concert_arena.jpg"
  },
  "concerts": [
    {
      "id": "c-01",
      "night": "jueves",
      "nightLabel": "Noche 1 • Viernes 2 de Octubre",
      "theme": "Noche Inaugural y Fusión Amazónica",
      "artist": "Yarawá y Ensamble Étnico del Trópico",
      "genre": "Fusión Amazónica Contemporánea y Raíz Étnica",
      "badge": "Inauguración Oficial",
      "date": "Viernes 2 de Octubre, 2026",
      "time": "20:30 - 23:00 hrs",
      "stage": "Escenario Central San Mateo",
      "image": "assets/img/artist_fusion.jpg",
      "origin": "Comunidades Yuracaré, Yuqui y Cochabamba",
      "description": "Concierto inaugural monumental que entrelaza la milenaria herencia musical de las tierras bajas y los pueblos indígenas del trópico con instrumentación acústica contemporánea.",
      "repertoire": [
        "Sinfonía del Río Isiboro y Cantos Ancestrales",
        "Ecos del Chapare (Flautas nativas y percusión mayor)",
        "Danza de la Selva Profunda",
        "Réquiem Verde por la Amazonía"
      ],
      "ticketInfo": "Entrada General Ferial incluye acceso a sector graderías. Mesas VIP para delegaciones disponibles con acreditación."
    },
    {
      "id": "c-02",
      "night": "viernes",
      "nightLabel": "Noche 2 • Sábado 3 de Octubre",
      "theme": "Noche Folclórica de Oro",
      "artist": "Los Jayas y Grandes Maestros del Folclore",
      "genre": "Música Folclórica Boliviana y Saya Caporal",
      "badge": "Estelar Folclórico",
      "date": "Sábado 3 de Octubre, 2026",
      "time": "21:00 - 00:30 hrs",
      "stage": "Escenario Central San Mateo",
      "image": "assets/img/artist_folklore.jpg",
      "origin": "Cochabamba, Bolivia",
      "description": "La cumbre del folclore nacional en el corazón del Trópico. Una velada inolvidable de charangos, vientos andinos, zampoñas y ritmos de taquiraris, huayños y sayas que unen a Bolivia.",
      "repertoire": [
        "Himnos Inmortales del Folclore Nacional",
        "Taquirari del Trópico y San Mateo",
        "Cantar de los Valles a la Selva",
        "Popurrí de Saya Afroboliviana y Caporales"
      ],
      "ticketInfo": "Ingreso con boleto ferial regular. Palcos VIP y salas de negocios habilitadas para empresas expositoras."
    },
    {
      "id": "c-03",
      "night": "sabado",
      "nightLabel": "Noche 3 • Domingo 4 de Octubre",
      "theme": "Gran Noche Tropical y Cumbia Ferial",
      "artist": "Orquesta Cumbia del Trópico y Grupo Sensación",
      "genre": "Cumbia Tropical Boliviana y Ritmos Caribeños",
      "badge": "Noche de Fiesta Ferial",
      "date": "Domingo 4 de Octubre, 2026",
      "time": "21:30 - 02:00 hrs",
      "stage": "Escenario Central San Mateo",
      "image": "assets/img/artist_tropical.jpg",
      "origin": "Trópico de Cochabamba y Santa Cruz",
      "description": "El espectáculo más bailable y multitudinario de FITROP. Una orquesta completa de metales, percusión caribeña y voces en vivo haciendo vibrar a más de 18,000 personas en la explanada.",
      "repertoire": [
        "Éxitos Clásicos de la Cumbia del Chapare",
        "Mosaico Caliente de Cumbias Andinas y del Sur",
        "Ritmo San Mateo y Sabor a Piña",
        "Cierre Monumental Bailable"
      ],
      "ticketInfo": "Control estricto de aforo. Apertura de puertas de la arena a las 19:00 hrs."
    },
    {
      "id": "c-04",
      "night": "domingo",
      "nightLabel": "Noche 4 • Domingo 18 de Octubre",
      "theme": "Noche de Clausura Internacional y Show de Luces",
      "artist": "Festival de Cierre FITROP Fest y Banda Internacional",
      "genre": "Pop-Rock Latino y Espectáculo de Drones",
      "badge": "Gala de Clausura",
      "date": "Domingo 18 de Octubre, 2026",
      "time": "20:00 - 23:30 hrs",
      "stage": "Escenario Central San Mateo",
      "image": "assets/img/concert_arena.jpg",
      "origin": "Delegaciones Internacionales y Bolivia",
      "description": "Gran noche de cierre con los himnos del rock y pop latinoamericano, seguida del espectáculo aéreo sincronizado de 200 drones iluminados dibujando los símbolos de FITROP en el cielo nocturno.",
      "repertoire": [
        "Antología del Pop-Rock del Cono Sur",
        "Show Sincronizado de Drones Lumínicos",
        "Homenaje a los Productores del Trópico",
        "Ceremonia de Premiación y Cierre de la Feria"
      ],
      "ticketInfo": "Entrada libre con el boleto general del día domingo. Transmisión nacional en directo."
    }
  ],
  "cochabambaMap": {
    "regions": [
      {
        "id": "tropico",
        "name": "Trópico de Cochabamba",
        "shortName": "El Trópico",
        "category": "Sede Central FITROP 2026",
        "color": "#10b981",
        "description": "Cuenca biológica y agroindustrial del oriente cochabambino. Conformada por los 5 municipios de la Mancomunidad y las Seis Federaciones.",
        "municipalitiesCount": 5,
        "surface": "24,000 km² aproximadamente",
        "altitude": "200 - 450 msnm",
        "climate": "Tropical húmedo y cálido (26°C - 34°C)"
      },
      {
        "id": "metropolitana",
        "name": "Región Metropolitana de Cochabamba",
        "shortName": "Valle Central",
        "category": "Conexión y Origen",
        "color": "#6366f1",
        "description": "Valle central que concentra Cercado, Sacaba, Quillacollo, Colcapirhua, Tiquipaya y Vinto. Eje administrativo y punto de partida por la Carretera Nueva Ruta 4.",
        "municipalitiesCount": 7,
        "surface": "2,500 km²",
        "altitude": "2,558 msnm",
        "climate": "Templado y seco de valle (15°C - 26°C)"
      },
      {
        "id": "valles",
        "name": "Región de los Valles (Valle Alto)",
        "shortName": "Valle Alto",
        "category": "Valle Productivo",
        "color": "#f59e0b",
        "description": "Tarata, Cliza, Punata, Arani y Anzaldo. Tradición productiva de granos, durazno, gastronomía ancestral y artesanías.",
        "municipalitiesCount": 15,
        "surface": "5,000 km²",
        "altitude": "2,600 - 2,900 msnm",
        "climate": "Templado interandino"
      },
      {
        "id": "conosur",
        "name": "Región del Cono Sur",
        "shortName": "Cono Sur",
        "category": "Valle Seco y Tradición",
        "color": "#ec4899",
        "description": "Aiquile, Mizque, Totora y Pasorapa. Capital continental del charango, producción de trigo, cebolla, maní y reservas naturales.",
        "municipalitiesCount": 6,
        "surface": "12,000 km²",
        "altitude": "1,800 - 2,500 msnm",
        "climate": "Seco y templado"
      },
      {
        "id": "andina",
        "name": "Región Andina de Cochabamba",
        "shortName": "Región Andina",
        "category": "Cabecera de Cuenca",
        "color": "#06b6d4",
        "description": "Ayopaya, Morochata, Tapacarí, Bolívar e Independencia. Altas cumbres, tubérculos nativos, ganado camélido y minería.",
        "municipalitiesCount": 5,
        "surface": "10,500 km²",
        "altitude": "3,000 - 4,200 msnm",
        "climate": "Frío andino de puna"
      }
    ],
    
    "federaciones": [
      {
            "id": "fed-tropico",
            "name": "Fed. Especial de Trabajadores Campesinos del Trópico",
            "municipio": "Villa Tunari",
            "muniId": "chapare",
            "color": "#059669",
            "badge": "Núcleo Ecoturístico y Piscícola",
            "desc": "Es un núcleo clave en la producción de coca y el secado de la hoja. Al mismo tiempo, lidera la producción de frutas tropicales (como cítricos y papaya) y ha desarrollado con fuerza el sector de la piscicultura (crianza de tambaquí y pacú) y el turismo comunitario."
      },
      {
            "id": "fed-chimore",
            "name": "Fed. Especial de Colonizadores de Chimoré",
            "municipio": "Chimoré (sede de la oficina principal)",
            "muniId": "carrasco",
            "color": "#ca8a04",
            "badge": "Complejo Agroindustrial y Lácteo",
            "desc": "Destaca por la producción masiva de piña de exportación y banano. Alberga importantes plantas procesadoras de lácteos y centros de acopio piscícolas que dan soporte técnico a sus afiliados."
      },
      {
            "id": "fed-carrasco",
            "name": "Fed. Especial de Colonizadores de Carrasco Tropical",
            "municipio": "Puerto Villarroel",
            "muniId": "carrasco",
            "color": "#ea580c",
            "badge": "Potencia Bananera y Cacao",
            "desc": "Es una potencia en la producción de banano de exportación (enviado principalmente a mercados como Argentina y Chile) y cultivos alternativos como el cacao y el café robusta."
      },
      {
            "id": "fed-centrales-unidas",
            "name": "Fed. Única de Centrales Unidas",
            "municipio": "Shinahota",
            "muniId": "tiraque",
            "color": "#2563eb",
            "badge": "Polo Frutícola y Ganadero",
            "desc": "Concentra gran parte de la producción hortícola y frutícola de la zona central, además de la siembra regulada de coca. Ha incursionado fuertemente en proyectos ganaderos y de apoyo a pequeños productores agrícolas."
      },
      {
            "id": "fed-yungas-chapare",
            "name": "Fed. Especial de Yungas de Chapare",
            "municipio": "Villa Tunari / Chapare",
            "muniId": "chapare",
            "color": "#047857",
            "badge": "Transición Montañosa y Apicultura",
            "desc": "Debido a su geografía de transición montañosa, se especializa en el cultivo tradicional de la hoja de coca, producción de miel y cítricos en zonas de ladera."
      },
      {
            "id": "fed-mamore-bulo-bulo",
            "name": "Fed. Agraria Mamoré Bulo Bulo",
            "municipio": "Entre Ríos",
            "muniId": "carrasco",
            "color": "#dc2626",
            "badge": "Llanura Ganadera y Granos",
            "desc": "Ubicada en una llanura muy fértil, lidera la producción ganadera (bovina) de la región, además de grandes extensiones de cultivos de arroz, maíz y yuca."
      }
],
    "municipalities": [
      {
            "id": "chapare",
            "name": "Chapare (Villa Tunari - Sede FITROP)",
            "provinceName": "Provincia Chapare (Trópico Central)",
            "capital": "Villa Tunari (Sede Trópico) / Sacaba (Cabecera)",
            "regionId": "tropico",
            "isVenue": true,
            "isTropico": true,
            "logoColor": "#059669",
            "logoColorName": "Verde Oficial del Escudo",
            "gradient": "gradVillaTunari",
            "aliases": [
                  "villa-tunari",
                  "sacaba",
                  "chapare"
            ],
            "role": "Sede Central FITROP 2026, Núcleo de Hoja de Coca, Piscicultura y Ecoturismo",
            "distanceKm": 160,
            "travelTime": "3h 30min desde Cochabamba Ciudad",
            "routeAccess": "Carretera Nueva Cochabamba - Santa Cruz (Ruta Nacional 4 asfaltada)",
            "federation": "Fed. Especial de Trabajadores Campesinos del Trópico y Fed. Especial de Yungas de Chapare",
            "venueLocation": "Recinto Ferial San Mateo (a orillas del Río San Mateo)",
            "altitudeMeters": 300,
            "surfaceKm2": "11,095 km²",
            "climate": "Tropical cálido y húmedo (26°C - 34°C)",
            "keyProducts": [
                  "Piscicultura (Crianza de Tambaquí y Pacú)",
                  "Producción y Secado de Hoja de Coca",
                  "Frutas Tropicales (Cítricos y Papaya)",
                  "Turismo Comunitario y Ecoturismo",
                  "Miel de Abeja en Zonas de Ladera"
            ],
            "tourismAttractions": [
                  "Recinto Ferial San Mateo (Sede FITROP 2026)",
                  "Parque Machía (Refugio de Fauna Silvestre)",
                  "Parque Nacional Carrasco y Cavernas del Repechón",
                  "Ríos San Mateo y Espíritu Santo (Rafting y Canotaje)",
                  "Laguna de San Isidro en Sacaba"
            ],
            "highlight": "Municipio sede del gran Recinto Ferial San Mateo, representado con el color verde en el escudo oficial de la Mancomunidad del Trópico.",
            "searchKeywords": "villa tunari chapare sede recinto san mateo pacu tambaqui banano ecoturismo machia repechon rafting verde coca frutas citricos papaya sacaba",
            "path": "M 322.7 310.9 L 323.4 311.8 L 328.6 314.5 L 329.9 316.9 L 332.3 319.6 L 335.7 317.2 L 338.8 319.2 L 340.2 319.0 L 340.9 318.1 L 347.7 317.1 L 350.5 317.4 L 356.0 319.2 L 358.4 319.2 L 363.3 316.4 L 363.5 317.4 L 364.8 318.4 L 362.3 322.5 L 359.6 324.2 L 358.2 326.0 L 358.1 329.1 L 359.7 334.2 L 357.4 334.6 L 355.9 337.2 L 353.8 336.7 L 352.2 338.4 L 352.3 339.3 L 346.2 344.6 L 345.6 349.0 L 346.3 350.4 L 346.6 353.3 L 347.8 354.2 L 349.6 355.1 L 353.4 354.3 L 355.3 355.5 L 352.3 359.9 L 356.1 361.1 L 357.4 360.8 L 358.3 361.9 L 358.8 366.5 L 360.3 370.3 L 359.8 372.0 L 359.2 371.9 L 357.7 374.3 L 357.2 381.3 L 356.6 382.2 L 358.3 383.4 L 360.3 388.2 L 362.2 389.4 L 363.8 392.6 L 365.0 392.6 L 366.5 395.8 L 368.9 398.3 L 370.7 402.7 L 370.6 403.9 L 372.3 405.4 L 374.6 405.2 L 375.8 407.9 L 383.2 408.0 L 385.7 407.4 L 386.4 406.5 L 391.7 403.5 L 393.1 401.8 L 394.6 402.2 L 396.3 400.5 L 397.6 401.2 L 401.9 398.7 L 406.2 395.8 L 407.2 393.9 L 413.5 393.9 L 414.7 392.2 L 413.7 387.7 L 410.6 386.5 L 409.4 383.8 L 412.9 382.4 L 415.1 382.6 L 417.8 381.6 L 419.9 382.8 L 421.9 381.6 L 423.6 376.2 L 425.3 374.4 L 426.5 374.3 L 431.5 371.4 L 432.9 367.4 L 434.5 366.2 L 434.5 365.3 L 439.2 361.7 L 441.8 358.5 L 443.6 357.5 L 445.0 354.3 L 446.1 353.8 L 446.4 352.5 L 449.5 349.6 L 453.2 343.2 L 454.7 342.0 L 459.3 340.6 L 460.1 339.7 L 461.5 339.9 L 463.2 338.0 L 467.3 337.0 L 468.1 335.6 L 468.8 335.5 L 468.2 333.0 L 469.7 332.5 L 471.0 330.3 L 478.7 322.5 L 480.3 323.6 L 482.1 323.3 L 485.0 321.9 L 485.6 320.8 L 486.6 320.9 L 487.1 319.4 L 490.0 317.8 L 490.5 316.9 L 490.3 315.5 L 489.3 315.6 L 488.9 314.6 L 488.0 314.2 L 488.1 313.7 L 491.1 312.7 L 492.5 312.8 L 493.9 311.5 L 494.5 311.5 L 495.7 313.0 L 496.6 312.6 L 498.1 308.3 L 497.8 307.1 L 498.8 300.3 L 500.3 296.8 L 503.8 296.0 L 508.2 293.2 L 514.7 292.1 L 524.8 286.3 L 525.6 285.1 L 528.3 284.3 L 530.3 284.6 L 533.2 282.7 L 535.1 280.6 L 539.0 278.7 L 538.8 277.5 L 540.9 276.7 L 540.5 275.2 L 542.9 276.0 L 543.9 275.5 L 543.3 273.6 L 543.4 272.4 L 544.2 271.7 L 543.9 270.3 L 545.6 270.6 L 546.8 268.7 L 550.5 267.1 L 551.2 266.3 L 551.2 265.1 L 550.2 263.8 L 549.7 261.9 L 550.2 260.5 L 551.9 259.8 L 554.9 260.3 L 557.7 257.9 L 556.9 256.1 L 554.1 256.4 L 552.8 254.8 L 553.0 253.5 L 556.2 252.1 L 555.9 250.4 L 551.9 249.9 L 550.1 251.3 L 549.4 250.7 L 551.8 248.0 L 555.4 248.9 L 557.4 246.1 L 557.5 245.4 L 556.5 244.2 L 555.0 243.7 L 553.4 244.0 L 553.3 242.7 L 555.6 238.6 L 556.4 238.1 L 558.5 238.3 L 559.1 237.1 L 557.6 236.1 L 554.2 235.2 L 554.2 234.2 L 556.4 233.8 L 559.3 235.3 L 560.7 235.4 L 562.7 234.3 L 564.5 235.5 L 564.7 235.0 L 562.5 231.1 L 563.2 230.7 L 565.7 231.7 L 566.3 230.8 L 563.9 229.7 L 563.2 228.8 L 563.4 228.0 L 565.2 228.7 L 567.7 232.0 L 568.9 231.9 L 569.8 230.9 L 569.9 229.7 L 568.3 228.7 L 567.9 227.8 L 568.4 225.7 L 567.4 224.4 L 567.7 223.5 L 569.1 223.5 L 572.4 225.6 L 573.8 224.1 L 575.6 224.4 L 574.6 222.8 L 572.8 223.5 L 571.6 223.2 L 571.8 222.2 L 572.9 221.4 L 575.1 222.3 L 576.2 222.0 L 576.7 220.8 L 576.6 217.3 L 578.2 217.4 L 580.1 219.0 L 580.9 218.7 L 580.3 217.2 L 578.5 216.3 L 579.1 215.0 L 578.3 213.4 L 578.7 213.0 L 580.0 214.0 L 580.2 215.6 L 580.9 216.1 L 582.8 214.4 L 585.1 214.5 L 584.8 213.4 L 582.1 212.6 L 582.0 211.8 L 585.8 210.2 L 585.8 207.5 L 588.3 208.8 L 588.0 205.8 L 589.4 202.3 L 591.8 203.3 L 593.0 206.2 L 593.8 206.4 L 595.0 205.3 L 595.2 204.0 L 593.1 203.0 L 592.6 200.8 L 591.7 200.5 L 590.1 201.7 L 589.8 201.3 L 591.8 198.4 L 593.0 198.5 L 593.9 199.4 L 594.9 199.1 L 595.3 196.1 L 597.9 190.7 L 600.2 188.9 L 600.3 187.9 L 599.7 187.1 L 597.2 187.3 L 596.6 186.8 L 596.2 183.5 L 594.3 181.9 L 595.3 180.5 L 597.7 180.6 L 597.2 179.0 L 595.8 178.6 L 595.5 177.9 L 596.8 176.1 L 596.7 175.3 L 595.5 174.5 L 594.7 175.0 L 594.3 176.3 L 593.6 175.9 L 595.9 171.7 L 598.3 172.7 L 598.5 172.1 L 597.3 171.1 L 593.5 171.0 L 591.5 171.9 L 590.9 170.7 L 593.3 168.7 L 593.9 165.9 L 592.9 165.7 L 590.9 167.4 L 590.8 166.4 L 592.2 165.7 L 592.3 165.1 L 591.0 163.1 L 589.5 162.3 L 589.4 161.5 L 590.1 161.1 L 592.3 161.6 L 593.6 161.0 L 592.4 159.0 L 592.3 157.2 L 593.1 154.8 L 594.4 155.2 L 596.3 153.5 L 595.3 150.9 L 596.4 150.5 L 598.7 152.1 L 599.3 150.1 L 600.5 149.1 L 600.6 147.2 L 598.6 145.5 L 598.5 144.8 L 600.4 143.2 L 600.9 141.1 L 600.7 138.3 L 601.9 137.9 L 603.9 138.9 L 604.6 141.1 L 607.6 141.5 L 608.2 140.9 L 607.7 139.4 L 604.5 137.9 L 605.9 129.3 L 605.2 128.0 L 603.1 127.5 L 603.4 126.4 L 606.7 125.3 L 606.0 127.1 L 606.8 128.5 L 607.9 129.4 L 610.3 129.5 L 608.9 126.8 L 609.2 125.9 L 610.2 125.6 L 613.3 127.0 L 614.1 126.7 L 613.9 124.7 L 611.9 121.7 L 612.4 120.2 L 613.7 119.8 L 615.5 121.1 L 615.4 118.6 L 618.0 118.2 L 618.4 115.1 L 619.7 115.4 L 620.7 115.0 L 621.9 112.7 L 622.9 112.7 L 623.5 113.5 L 622.3 115.6 L 623.0 116.5 L 623.6 116.3 L 624.2 111.8 L 625.7 111.4 L 627.0 109.6 L 629.2 109.8 L 629.7 107.4 L 630.7 107.2 L 629.5 103.1 L 627.7 100.5 L 628.0 99.1 L 629.6 98.2 L 629.6 97.7 L 625.8 96.1 L 624.3 96.4 L 627.2 93.0 L 628.7 93.5 L 629.1 94.9 L 629.7 94.9 L 629.8 92.8 L 627.7 91.2 L 627.1 89.1 L 627.9 87.3 L 627.9 85.0 L 628.5 84.9 L 628.6 86.0 L 629.2 86.4 L 631.1 85.2 L 631.3 84.6 L 630.1 82.8 L 630.7 82.3 L 632.3 83.2 L 632.0 81.0 L 633.6 79.1 L 634.5 75.7 L 635.5 74.9 L 637.7 75.0 L 638.6 74.5 L 638.6 72.6 L 635.3 69.6 L 635.3 68.8 L 635.8 68.3 L 636.7 68.6 L 638.8 70.9 L 639.6 70.7 L 640.0 69.1 L 638.6 65.9 L 637.4 64.9 L 634.9 64.1 L 634.4 62.6 L 635.7 60.2 L 636.0 57.2 L 638.6 53.4 L 638.7 49.6 L 592.8 49.4 L 583.9 53.7 L 580.1 57.0 L 576.2 61.4 L 570.1 71.4 L 568.3 76.7 L 566.6 92.5 L 561.1 130.8 L 556.4 141.0 L 536.3 168.8 L 513.5 175.5 L 465.1 188.0 L 416.7 194.4 L 411.5 194.6 L 400.9 192.5 L 389.5 189.4 L 381.9 185.7 L 372.4 178.9 L 361.6 174.6 L 349.6 167.5 L 337.3 151.3 L 315.6 115.9 L 321.9 151.7 L 321.5 155.9 L 322.2 166.4 L 318.8 175.2 L 318.0 175.7 L 318.0 176.7 L 322.1 178.9 L 322.4 179.7 L 326.6 182.7 L 327.1 183.8 L 331.8 187.6 L 333.7 187.2 L 335.4 187.7 L 336.6 189.3 L 336.1 190.1 L 336.6 191.5 L 337.8 192.7 L 339.2 193.1 L 340.2 194.9 L 341.1 194.6 L 343.0 196.9 L 345.8 197.5 L 346.1 198.3 L 345.6 199.0 L 346.5 200.2 L 347.4 200.2 L 348.2 199.4 L 349.3 200.9 L 351.2 201.4 L 351.1 204.3 L 352.9 206.1 L 353.1 207.0 L 355.3 208.8 L 351.7 212.8 L 351.6 213.9 L 350.4 215.0 L 349.9 216.4 L 347.2 217.1 L 346.2 217.9 L 345.7 219.1 L 346.0 220.7 L 345.4 221.2 L 345.6 223.1 L 347.7 225.3 L 347.4 226.2 L 348.1 227.9 L 347.5 228.2 L 347.8 229.0 L 347.4 229.6 L 349.2 231.0 L 347.1 234.3 L 348.4 236.6 L 349.3 240.4 L 349.3 242.0 L 348.4 244.2 L 348.6 245.6 L 349.6 246.0 L 349.8 248.4 L 349.3 250.4 L 350.3 251.5 L 348.7 251.9 L 348.7 252.5 L 346.5 254.1 L 345.3 254.1 L 344.6 253.4 L 342.8 253.9 L 341.1 253.1 L 336.9 253.8 L 333.9 251.7 L 331.9 251.0 L 329.3 251.1 L 327.5 253.1 L 326.4 253.3 L 325.0 254.5 L 323.0 254.9 L 321.7 257.3 L 320.9 260.8 L 321.1 266.2 L 323.0 268.4 L 323.1 269.5 L 324.3 269.9 L 324.3 271.1 L 324.9 271.7 L 325.7 271.6 L 325.9 273.8 L 326.9 275.5 L 328.0 275.6 L 330.8 277.4 L 332.1 277.2 L 334.7 279.2 L 336.0 279.5 L 340.0 284.6 L 339.9 287.2 L 338.5 288.8 L 334.9 290.9 L 333.5 290.9 L 333.3 291.7 L 331.4 293.0 L 330.7 294.3 L 331.1 294.9 L 327.7 297.4 L 324.5 298.5 L 321.3 295.5 L 313.4 300.5 L 320.6 304.5 L 323.1 307.8 L 322.7 310.9 Z",
            "cx": 489.5,
            "cy": 230.2
      },
      {
            "id": "carrasco",
            "name": "Carrasco (Chimoré, Puerto Villarroel y Entre Ríos)",
            "provinceName": "Provincia Carrasco (Trópico Oriental y Cono Sur)",
            "capital": "Totora (Cabecera) / Chimoré (Sede Mancomunidad)",
            "regionId": "tropico",
            "isVenue": false,
            "isTropico": true,
            "logoColor": "#ca8a04",
            "logoColorName": "Amarillo y Naranja del Escudo",
            "gradient": "gradChimore",
            "aliases": [
                  "chimore",
                  "puerto-villarroel",
                  "entre-rios",
                  "carrasco",
                  "totora"
            ],
            "role": "Hub Agroindustrial, Banano y Piña de Exportación, Hidrovía Fluvial y Complejo Lácteo",
            "distanceKm": 192,
            "travelTime": "4h 10min desde Cochabamba Ciudad",
            "routeAccess": "Carretera Nueva Ruta 4 y Conexión Fluvial Río Ichilo hacia el Atlántico",
            "federation": "Fed. Especial de Colonizadores de Chimoré, Fed. Especial de Carrasco Tropical y Fed. Agraria Mamoré Bulo Bulo",
            "venueLocation": "Pabellón Agroindustrial y Terminal Fluvial de Puerto Villarroel",
            "altitudeMeters": 240,
            "surfaceKm2": "15,045 km²",
            "climate": "Cálido tropical y subtropical",
            "keyProducts": [
                  "Piña de Exportación y Banano Cavendish",
                  "Plantas Procesadoras de Lácteos",
                  "Centros de Acopio Piscícolas",
                  "Ganadería Bovina y Granos (Arroz, Maíz y Yuca)",
                  "Cacao Nativo y Café Robusta"
            ],
            "tourismAttractions": [
                  "Aeropuerto Internacional Soberanía en Chimoré",
                  "Puerto Fluvial Multimodal Puerto Villarroel (Río Ichilo)",
                  "Pueblo Colonial de Totora (Ciudad de los Pianos)",
                  "Ruinas Incas de Incallajta en Pocona",
                  "Complejo Petroquímico en Bulo Bulo"
            ],
            "highlight": "Potencia productiva y exportadora del oriente cochabambino. Integra las federaciones de Chimoré, Carrasco Tropical y Mamoré Bulo Bulo con salida soberana a la hidrovía.",
            "searchKeywords": "carrasco chimore puerto villarroel entre rios bulo bulo totora pina banano lacteos rio ichilo hidrovia pacu ganado arroz maiz yuca",
            "path": "M 473.6 450.4 L 474.2 451.7 L 476.1 452.8 L 479.1 456.7 L 483.4 460.0 L 484.7 464.2 L 486.1 465.2 L 487.3 463.7 L 489.3 463.2 L 492.2 464.7 L 492.9 464.2 L 494.9 464.4 L 496.0 465.2 L 498.5 464.9 L 500.1 465.3 L 502.2 466.6 L 506.1 465.9 L 507.8 467.5 L 511.2 467.8 L 512.7 466.0 L 516.1 466.2 L 520.6 467.5 L 522.8 471.3 L 522.0 472.4 L 521.8 474.9 L 525.3 482.0 L 526.4 482.6 L 526.5 484.0 L 527.6 484.4 L 529.2 486.2 L 530.0 488.1 L 531.4 489.4 L 534.8 490.3 L 537.2 492.9 L 537.6 494.6 L 540.9 495.4 L 540.6 496.6 L 541.8 496.6 L 542.6 498.3 L 543.4 498.3 L 543.0 497.7 L 543.8 497.2 L 544.5 497.4 L 545.3 498.7 L 544.8 499.8 L 545.7 500.9 L 546.9 501.1 L 547.9 502.1 L 548.3 501.4 L 549.0 502.4 L 550.2 502.2 L 551.0 503.8 L 553.4 504.1 L 554.7 506.5 L 557.3 508.0 L 557.7 511.0 L 561.1 511.9 L 561.6 512.3 L 561.4 513.4 L 566.0 514.2 L 568.1 517.0 L 569.6 517.6 L 570.5 518.7 L 571.0 518.7 L 570.9 518.1 L 571.6 517.5 L 570.9 517.0 L 571.5 516.3 L 572.3 516.9 L 572.8 518.5 L 574.1 518.9 L 576.5 518.5 L 577.7 520.2 L 578.5 520.5 L 578.8 519.6 L 578.4 519.0 L 580.4 518.6 L 580.9 517.5 L 581.6 517.5 L 580.5 514.2 L 580.6 512.8 L 579.2 512.1 L 582.9 508.2 L 583.3 506.9 L 581.5 505.0 L 581.0 503.5 L 581.3 501.2 L 580.3 497.5 L 581.8 496.8 L 582.1 494.0 L 583.7 493.0 L 583.5 491.7 L 586.8 488.7 L 589.3 485.1 L 598.1 489.6 L 600.6 495.5 L 606.4 503.8 L 605.6 505.3 L 607.1 508.0 L 612.9 508.3 L 620.2 507.5 L 623.2 508.9 L 631.4 508.5 L 629.8 506.9 L 629.2 507.8 L 628.6 507.2 L 628.0 507.9 L 627.4 506.4 L 625.3 504.9 L 624.7 502.7 L 622.5 500.1 L 627.3 497.7 L 623.3 489.2 L 626.3 479.0 L 629.1 476.0 L 629.9 474.0 L 629.1 472.0 L 632.0 464.4 L 633.3 459.3 L 635.4 456.2 L 636.7 456.5 L 638.9 455.6 L 642.0 455.3 L 644.2 452.0 L 647.4 452.5 L 651.8 451.6 L 653.1 452.1 L 654.3 451.7 L 655.0 450.5 L 656.8 450.3 L 656.9 449.7 L 656.4 449.5 L 656.8 447.9 L 656.5 443.6 L 658.9 441.5 L 659.2 440.0 L 661.5 441.0 L 661.9 438.3 L 664.5 436.2 L 664.3 435.3 L 665.3 434.9 L 666.4 431.6 L 666.3 429.0 L 667.1 427.7 L 665.0 425.3 L 664.3 418.6 L 667.9 418.4 L 674.8 420.4 L 676.1 417.8 L 678.6 416.6 L 679.7 415.1 L 680.4 415.1 L 680.9 413.7 L 683.1 416.8 L 685.0 418.1 L 685.7 417.8 L 687.0 419.2 L 688.2 418.6 L 691.2 419.9 L 698.4 419.2 L 698.9 414.9 L 700.2 414.1 L 699.3 412.6 L 699.4 411.4 L 702.7 410.5 L 703.2 406.0 L 704.9 405.1 L 703.6 401.0 L 703.8 399.7 L 704.8 399.5 L 704.9 398.9 L 703.8 396.8 L 704.8 396.9 L 705.5 396.3 L 708.2 397.6 L 710.5 396.7 L 710.7 395.2 L 711.7 394.7 L 713.5 394.9 L 713.5 394.3 L 712.8 394.4 L 712.5 393.9 L 713.3 392.6 L 713.6 393.6 L 714.0 393.5 L 715.1 390.5 L 716.9 391.4 L 718.1 391.0 L 718.5 390.2 L 720.2 390.2 L 723.6 393.4 L 726.1 393.2 L 728.9 390.7 L 730.2 390.4 L 731.2 390.9 L 732.5 390.3 L 734.3 390.9 L 733.4 389.2 L 735.3 388.0 L 734.2 386.4 L 736.7 385.1 L 738.2 380.2 L 737.5 378.6 L 737.7 377.6 L 737.2 377.3 L 737.8 375.2 L 736.9 373.8 L 736.8 372.0 L 736.0 371.1 L 737.3 368.4 L 736.0 368.3 L 735.4 366.2 L 735.9 365.4 L 735.6 364.9 L 733.6 363.7 L 732.3 364.5 L 731.8 364.2 L 731.7 362.9 L 730.7 363.3 L 729.2 362.5 L 730.1 361.6 L 728.1 360.5 L 728.3 357.1 L 725.3 356.6 L 723.9 355.6 L 722.9 355.8 L 722.7 357.1 L 724.7 358.7 L 724.8 359.6 L 724.1 359.9 L 722.7 359.2 L 721.9 357.1 L 719.4 356.6 L 717.6 357.2 L 716.9 356.9 L 717.5 352.9 L 719.9 352.9 L 720.8 352.1 L 720.3 351.2 L 717.7 350.2 L 717.5 349.1 L 718.4 346.5 L 717.7 345.2 L 714.4 346.4 L 714.0 347.3 L 714.4 349.6 L 714.0 350.0 L 710.7 349.8 L 711.7 346.3 L 709.9 343.9 L 710.1 343.1 L 713.2 343.1 L 713.5 340.8 L 712.5 340.1 L 709.9 341.3 L 707.9 338.1 L 705.3 338.6 L 705.2 337.0 L 707.7 335.9 L 707.4 334.2 L 706.0 333.7 L 703.9 335.7 L 703.0 335.3 L 702.9 334.3 L 704.0 333.1 L 706.8 332.6 L 706.0 331.0 L 705.2 330.6 L 704.2 331.1 L 703.6 332.8 L 702.8 333.3 L 700.4 331.0 L 699.9 331.6 L 699.7 334.7 L 698.4 334.8 L 697.7 333.3 L 698.8 330.4 L 698.3 329.0 L 696.9 328.9 L 694.7 331.3 L 693.4 331.0 L 692.6 329.5 L 691.4 329.4 L 689.5 330.5 L 687.9 330.1 L 686.9 329.1 L 687.2 328.1 L 689.5 327.1 L 689.5 326.3 L 685.3 323.1 L 684.8 320.6 L 683.2 320.5 L 681.0 322.3 L 677.6 320.2 L 675.0 320.1 L 675.4 318.1 L 676.2 317.1 L 677.9 316.6 L 679.3 315.0 L 681.4 315.0 L 681.7 314.2 L 681.1 313.4 L 675.4 313.1 L 674.8 313.7 L 675.0 315.7 L 674.1 316.2 L 671.6 313.8 L 669.3 314.1 L 668.7 312.7 L 671.9 309.9 L 671.9 309.0 L 670.8 308.3 L 669.8 308.4 L 667.8 310.7 L 667.2 312.8 L 666.2 312.8 L 665.0 311.3 L 662.6 310.4 L 662.5 309.4 L 663.6 308.9 L 666.8 310.4 L 667.4 309.7 L 667.1 308.7 L 665.1 307.3 L 663.5 306.9 L 662.2 308.8 L 661.2 308.9 L 660.6 307.4 L 661.6 305.5 L 660.9 304.5 L 659.6 305.2 L 659.0 306.3 L 659.9 308.6 L 659.1 309.4 L 657.4 309.6 L 656.5 308.8 L 656.7 305.6 L 659.1 304.1 L 659.4 303.2 L 659.0 302.5 L 657.2 302.5 L 655.2 303.3 L 652.3 301.9 L 651.5 302.9 L 652.2 304.1 L 651.9 304.8 L 649.9 304.2 L 648.0 305.5 L 646.7 305.1 L 646.7 300.7 L 647.6 300.5 L 649.7 301.5 L 650.3 300.8 L 650.0 299.6 L 648.3 298.4 L 646.1 298.1 L 645.1 298.9 L 645.6 301.2 L 643.8 302.1 L 643.0 301.3 L 642.7 299.2 L 643.5 298.3 L 646.2 297.3 L 646.8 295.1 L 648.0 295.2 L 648.6 296.7 L 649.3 297.1 L 650.1 296.5 L 649.8 295.3 L 645.1 291.8 L 643.9 291.5 L 643.2 292.3 L 643.7 295.2 L 642.3 295.5 L 641.2 294.6 L 640.9 293.6 L 642.8 291.6 L 642.7 289.7 L 642.0 289.3 L 641.1 289.6 L 640.6 290.8 L 638.8 291.9 L 637.5 291.4 L 636.8 290.2 L 635.3 289.3 L 635.3 288.8 L 636.8 289.1 L 637.7 288.4 L 637.7 287.2 L 636.8 286.3 L 637.0 285.6 L 638.3 285.4 L 640.0 286.7 L 640.6 286.0 L 640.3 284.8 L 638.3 283.5 L 637.1 283.6 L 636.3 284.6 L 634.7 284.1 L 634.6 283.0 L 635.8 281.4 L 638.2 281.0 L 639.1 280.3 L 638.9 279.1 L 637.7 277.5 L 636.6 277.6 L 635.9 279.2 L 634.4 280.0 L 633.3 279.8 L 632.5 278.5 L 633.0 277.5 L 637.0 275.8 L 637.3 273.7 L 635.7 273.3 L 632.5 275.6 L 631.6 275.7 L 630.6 274.8 L 630.8 273.7 L 635.5 272.6 L 636.3 272.2 L 636.7 271.0 L 635.6 270.3 L 632.8 270.4 L 630.8 272.4 L 626.7 268.8 L 626.1 264.5 L 626.6 263.3 L 628.5 262.1 L 628.8 260.5 L 628.4 259.5 L 626.9 258.6 L 624.3 258.8 L 623.7 256.3 L 621.5 254.4 L 621.3 253.4 L 622.2 252.5 L 624.7 254.1 L 625.8 253.2 L 625.3 251.9 L 623.1 251.5 L 618.5 254.3 L 617.5 253.8 L 618.7 251.2 L 618.6 250.2 L 617.8 248.8 L 616.4 248.0 L 616.1 246.9 L 616.5 245.6 L 618.2 243.7 L 619.7 243.7 L 623.8 245.8 L 625.6 248.7 L 626.7 248.9 L 627.9 247.8 L 628.6 245.8 L 628.1 242.9 L 626.6 241.7 L 624.5 241.5 L 623.3 240.8 L 622.6 238.4 L 623.2 237.4 L 626.1 236.4 L 627.1 235.4 L 627.8 233.9 L 628.3 229.7 L 629.6 228.7 L 631.1 229.7 L 631.1 231.5 L 629.9 234.3 L 630.4 235.5 L 632.0 235.4 L 633.1 234.0 L 633.6 229.5 L 633.2 228.4 L 630.2 225.2 L 627.7 225.2 L 626.5 224.0 L 628.4 220.2 L 631.6 218.4 L 634.9 215.3 L 635.2 213.1 L 634.6 208.1 L 632.8 207.7 L 632.4 207.1 L 633.2 205.7 L 636.5 204.0 L 636.5 202.2 L 634.6 200.1 L 634.5 199.0 L 636.1 197.6 L 640.1 198.0 L 641.0 199.4 L 639.4 201.9 L 639.6 203.1 L 640.5 203.8 L 642.4 204.0 L 643.1 203.6 L 644.4 200.3 L 644.2 198.6 L 642.4 196.9 L 642.4 195.5 L 646.1 194.3 L 647.1 193.2 L 646.3 192.1 L 643.7 193.5 L 642.7 193.5 L 642.2 192.7 L 642.5 191.0 L 644.2 189.7 L 646.3 190.2 L 648.3 192.0 L 649.2 191.9 L 650.1 190.9 L 649.8 189.4 L 647.2 185.2 L 647.3 184.2 L 649.4 182.0 L 648.4 181.0 L 645.2 180.3 L 644.9 179.1 L 645.5 178.3 L 648.1 177.6 L 649.2 176.6 L 653.5 170.0 L 651.8 169.3 L 647.6 170.9 L 645.7 170.6 L 645.7 169.1 L 647.3 168.0 L 647.5 167.1 L 646.7 166.3 L 643.5 165.9 L 642.9 165.0 L 643.1 163.6 L 644.4 163.3 L 647.8 164.7 L 649.2 166.1 L 649.5 167.9 L 650.3 167.9 L 651.6 166.5 L 651.7 162.0 L 653.5 160.5 L 655.1 160.4 L 655.9 159.2 L 655.8 158.1 L 654.6 157.5 L 650.3 159.5 L 648.6 158.8 L 649.9 156.4 L 655.2 154.1 L 655.3 153.2 L 654.2 152.1 L 649.8 151.3 L 648.6 151.8 L 647.2 153.4 L 646.0 152.5 L 646.1 151.3 L 647.9 148.7 L 650.0 146.1 L 651.8 145.2 L 651.6 142.1 L 649.8 141.7 L 649.2 140.8 L 650.3 138.3 L 650.7 135.1 L 650.4 134.3 L 644.0 131.6 L 643.0 130.3 L 645.8 126.8 L 646.6 127.4 L 646.0 128.8 L 646.3 130.0 L 647.6 130.3 L 648.4 129.4 L 648.3 127.0 L 650.2 122.6 L 650.2 120.6 L 648.0 118.3 L 647.8 117.4 L 650.4 115.5 L 652.0 111.4 L 650.8 111.1 L 649.1 112.0 L 648.3 113.0 L 648.1 115.2 L 646.9 115.7 L 644.8 114.1 L 645.0 113.0 L 647.0 111.9 L 646.3 110.2 L 645.1 109.7 L 643.1 110.0 L 641.7 108.6 L 639.2 108.3 L 640.2 106.4 L 642.4 105.1 L 644.2 105.9 L 644.8 109.3 L 646.1 109.1 L 646.7 107.8 L 645.7 105.6 L 646.1 102.7 L 644.9 102.5 L 643.8 104.2 L 642.8 104.7 L 642.0 104.5 L 641.5 103.6 L 644.3 98.6 L 644.2 97.3 L 640.0 94.9 L 639.5 95.8 L 640.9 97.8 L 640.5 99.0 L 639.3 99.5 L 638.1 98.5 L 639.3 93.8 L 641.5 93.1 L 644.0 93.9 L 644.5 93.2 L 644.2 92.2 L 643.0 91.5 L 641.2 91.6 L 639.2 92.5 L 638.1 92.3 L 637.9 90.4 L 642.0 87.2 L 642.9 85.0 L 642.0 83.5 L 640.7 83.5 L 639.9 84.6 L 639.8 87.0 L 637.2 87.6 L 636.4 87.2 L 638.1 85.1 L 639.2 82.5 L 639.5 81.4 L 639.1 80.8 L 638.1 80.5 L 633.8 81.4 L 633.6 79.1 L 632.0 81.0 L 632.3 83.2 L 630.7 82.3 L 630.1 82.8 L 631.3 84.6 L 631.1 85.2 L 629.2 86.4 L 628.6 86.0 L 628.5 84.9 L 627.9 85.0 L 627.9 87.3 L 627.1 89.1 L 627.7 91.2 L 629.8 92.8 L 629.8 94.7 L 629.1 94.9 L 628.7 93.5 L 627.2 93.0 L 624.3 96.4 L 625.8 96.1 L 629.6 97.7 L 629.6 98.2 L 628.0 99.1 L 627.7 100.5 L 629.5 103.1 L 630.7 107.2 L 629.7 107.4 L 629.2 109.8 L 627.0 109.6 L 625.7 111.4 L 624.2 111.8 L 623.6 116.3 L 623.0 116.5 L 622.3 115.6 L 623.5 113.5 L 622.9 112.7 L 621.9 112.7 L 620.7 115.0 L 619.7 115.4 L 618.4 115.1 L 618.0 118.2 L 615.4 118.6 L 615.5 121.1 L 613.7 119.8 L 612.4 120.2 L 611.9 121.7 L 613.9 124.7 L 614.1 126.7 L 613.3 127.0 L 610.2 125.6 L 609.2 125.9 L 608.9 126.8 L 610.3 129.5 L 607.9 129.4 L 606.8 128.5 L 606.0 127.1 L 606.7 125.3 L 603.4 126.4 L 603.1 127.5 L 605.2 128.0 L 605.9 129.3 L 604.5 137.9 L 607.7 139.4 L 608.2 140.9 L 607.6 141.5 L 604.6 141.1 L 603.9 138.9 L 601.9 137.9 L 600.7 138.3 L 600.9 141.1 L 600.4 143.2 L 598.5 144.8 L 598.6 145.5 L 600.6 147.2 L 600.5 149.1 L 599.3 150.1 L 598.7 152.1 L 596.4 150.5 L 595.3 150.9 L 596.3 153.5 L 594.4 155.2 L 593.1 154.8 L 592.3 157.2 L 592.4 159.0 L 593.6 161.0 L 592.3 161.6 L 590.1 161.1 L 589.4 161.5 L 589.5 162.3 L 590.6 162.7 L 592.3 165.1 L 592.2 165.7 L 590.8 166.4 L 590.9 167.4 L 592.3 166.0 L 593.9 165.9 L 593.3 168.7 L 590.9 170.7 L 591.5 171.9 L 593.8 171.0 L 597.3 171.1 L 598.5 172.1 L 598.3 172.7 L 595.9 171.7 L 593.6 175.9 L 594.3 176.3 L 594.7 175.0 L 595.5 174.5 L 596.7 175.3 L 596.8 176.1 L 595.5 177.9 L 595.8 178.6 L 597.2 179.0 L 597.7 180.6 L 595.3 180.5 L 594.3 181.9 L 596.2 183.5 L 596.6 186.8 L 597.2 187.3 L 599.7 187.1 L 600.3 187.9 L 600.2 188.9 L 597.9 190.7 L 595.3 196.1 L 594.9 199.1 L 593.9 199.4 L 593.0 198.5 L 591.8 198.4 L 589.8 201.3 L 590.1 201.7 L 591.7 200.5 L 592.6 200.8 L 593.1 203.0 L 595.2 204.0 L 595.0 205.3 L 593.8 206.4 L 593.0 206.2 L 591.8 203.3 L 589.4 202.3 L 588.0 205.8 L 588.3 208.8 L 585.8 207.5 L 585.8 210.2 L 582.0 211.8 L 582.1 212.6 L 584.8 213.4 L 585.1 214.5 L 582.8 214.4 L 580.9 216.1 L 580.2 215.6 L 580.0 214.0 L 578.7 213.0 L 578.3 213.4 L 579.1 215.0 L 578.5 216.3 L 580.3 217.2 L 580.9 218.7 L 580.1 219.0 L 578.2 217.4 L 576.6 217.3 L 576.7 220.8 L 576.2 222.0 L 575.1 222.3 L 572.9 221.4 L 571.8 222.2 L 571.6 223.2 L 572.8 223.5 L 574.6 222.8 L 575.6 224.4 L 573.8 224.1 L 572.4 225.6 L 569.1 223.5 L 567.7 223.5 L 567.4 224.4 L 568.4 225.7 L 567.9 227.8 L 568.3 228.7 L 569.9 229.7 L 569.8 230.9 L 568.9 231.9 L 567.7 232.0 L 565.2 228.7 L 563.4 228.0 L 563.2 228.8 L 563.9 229.7 L 566.3 230.8 L 565.7 231.7 L 563.2 230.7 L 562.5 231.1 L 564.7 235.0 L 564.5 235.5 L 562.7 234.3 L 560.7 235.4 L 559.3 235.3 L 556.4 233.8 L 554.1 234.4 L 554.2 235.2 L 557.6 236.1 L 559.1 237.1 L 558.5 238.3 L 556.4 238.1 L 555.6 238.6 L 553.3 242.7 L 553.4 244.0 L 555.0 243.7 L 556.5 244.2 L 557.5 245.4 L 557.4 246.1 L 555.4 248.9 L 551.8 248.0 L 549.4 250.7 L 550.1 251.3 L 551.9 249.9 L 555.9 250.4 L 556.2 252.1 L 553.0 253.5 L 552.8 254.8 L 554.1 256.4 L 556.9 256.1 L 557.7 257.9 L 554.9 260.3 L 551.9 259.8 L 550.2 260.5 L 549.7 261.9 L 550.2 263.8 L 551.2 265.1 L 551.2 266.3 L 550.5 267.1 L 546.6 268.9 L 545.5 271.2 L 546.8 272.7 L 546.8 274.5 L 546.1 275.3 L 544.0 275.9 L 544.5 277.2 L 546.2 278.2 L 547.5 278.3 L 547.8 279.1 L 547.0 279.9 L 545.6 279.7 L 545.0 278.5 L 543.9 277.9 L 543.0 278.8 L 543.7 279.9 L 547.0 281.3 L 546.6 282.0 L 545.8 281.7 L 545.4 282.4 L 544.7 282.4 L 545.4 283.2 L 544.5 283.4 L 544.5 284.5 L 545.3 283.7 L 545.6 284.0 L 544.5 285.5 L 544.9 286.2 L 545.6 286.2 L 544.9 287.9 L 545.9 287.3 L 546.2 289.7 L 545.5 289.9 L 545.9 291.4 L 544.9 290.6 L 543.9 291.7 L 545.4 294.6 L 545.0 295.5 L 544.1 295.6 L 545.3 297.1 L 544.3 299.1 L 543.2 298.9 L 542.9 299.3 L 543.8 299.9 L 545.6 303.7 L 545.1 303.9 L 545.3 304.6 L 544.1 305.4 L 543.5 307.1 L 541.1 309.6 L 541.2 311.8 L 540.6 312.4 L 541.4 314.7 L 539.7 315.1 L 539.5 316.6 L 540.2 317.1 L 540.1 317.9 L 541.0 318.1 L 541.5 318.9 L 540.1 321.2 L 538.4 321.4 L 540.3 322.7 L 540.1 323.3 L 547.6 323.3 L 549.8 327.3 L 550.0 328.6 L 549.4 329.3 L 547.2 329.7 L 547.8 330.8 L 542.5 345.3 L 536.8 349.7 L 535.2 351.6 L 535.7 352.6 L 535.6 354.7 L 536.3 355.8 L 535.6 357.3 L 536.7 358.3 L 536.9 359.3 L 536.4 362.0 L 538.9 367.1 L 537.6 368.6 L 538.6 369.1 L 537.8 371.8 L 539.3 375.4 L 538.9 376.2 L 539.3 376.8 L 537.2 379.1 L 535.3 379.6 L 533.7 381.1 L 532.8 380.7 L 532.7 381.9 L 531.2 382.0 L 529.9 384.2 L 527.5 382.8 L 525.7 383.9 L 525.5 384.7 L 523.5 386.1 L 523.3 387.0 L 522.5 387.1 L 521.8 388.5 L 523.1 391.2 L 521.6 392.3 L 521.9 393.7 L 521.4 395.1 L 519.8 396.1 L 518.5 398.4 L 516.2 400.6 L 516.6 404.9 L 515.4 409.7 L 512.9 408.3 L 511.2 406.4 L 507.9 404.7 L 505.9 405.1 L 504.1 404.0 L 496.9 405.0 L 496.4 405.9 L 494.9 405.8 L 493.1 407.0 L 484.8 406.0 L 484.3 406.8 L 484.7 408.6 L 487.5 409.4 L 489.8 411.6 L 495.8 415.6 L 495.4 416.8 L 492.7 419.4 L 489.2 417.2 L 487.2 414.7 L 485.0 413.4 L 484.3 414.5 L 480.4 417.5 L 478.8 416.8 L 476.8 417.6 L 475.7 417.1 L 475.1 419.1 L 475.7 421.8 L 476.9 423.7 L 477.0 427.1 L 478.7 428.3 L 478.9 430.3 L 482.0 432.2 L 484.2 435.4 L 486.1 436.6 L 485.6 437.7 L 484.1 438.6 L 483.0 440.1 L 481.7 447.2 L 480.4 448.1 L 473.6 450.4 Z",
            "cx": 614.9,
            "cy": 288.2
      },
      {
            "id": "tiraque",
            "name": "Tiraque (Shinahota - Centrales Unidas)",
            "provinceName": "Provincia Tiraque (Trópico Central y Valles Altos)",
            "capital": "Tiraque (Cabecera) / Shinahota (Trópico)",
            "regionId": "tropico",
            "isVenue": false,
            "isTropico": true,
            "logoColor": "#2563eb",
            "logoColorName": "Azul Oficial del Escudo",
            "gradient": "gradShinahota",
            "aliases": [
                  "shinahota",
                  "tiraque"
            ],
            "role": "Polo Hortícola, Frutícola, Diversificación Agrícola y Proyectos Ganaderos",
            "distanceKm": 180,
            "travelTime": "3h 50min desde Cochabamba Ciudad",
            "routeAccess": "Carretera Nueva Cochabamba - Santa Cruz (Ruta Nacional 4)",
            "federation": "Fed. Única de Centrales Unidas (Shinahota)",
            "venueLocation": "Centro de Investigación Agrícola y Piscícola de Shinahota",
            "altitudeMeters": 280,
            "surfaceKm2": "1,739 km²",
            "climate": "Transición de valle a trópico húmedo",
            "keyProducts": [
                  "Producción Hortícola y Frutícola",
                  "Siembra Regulada de Coca",
                  "Proyectos Ganaderos y de Apoyo Agrícola",
                  "Papa Nativa y Tubérculos de Altura",
                  "Cítricos y Naranja Valencia"
            ],
            "tourismAttractions": [
                  "Santuario de Vida Silvestre de Shinahota",
                  "Circuito Ecoturístico de las Tres Lagunas",
                  "Caídas de Agua de la Yunga de Tiraque",
                  "Represa de Totora Khocha",
                  "Feria Tradicional de la Papa Nativa"
            ],
            "highlight": "Municipio clave del Trópico central que articula la agricultura diversificada de Centrales Unidas, representado con el color azul en el escudo oficial.",
            "searchKeywords": "tiraque shinahota centrales unidas horticola fruticola coca ganaderia tres lagunas papa nativa azul",
            "path": "M 484.3 406.8 L 484.8 406.0 L 493.1 407.0 L 494.0 406.8 L 494.6 405.9 L 496.4 405.9 L 496.9 405.0 L 504.1 404.0 L 505.9 405.1 L 507.9 404.7 L 511.2 406.4 L 512.9 408.3 L 515.4 409.7 L 516.6 404.9 L 516.2 400.6 L 518.5 398.4 L 519.8 396.1 L 521.4 395.1 L 521.9 393.7 L 521.6 392.3 L 523.1 391.2 L 521.8 388.5 L 522.5 387.1 L 523.3 387.0 L 523.5 386.1 L 527.5 382.8 L 529.9 384.2 L 531.2 382.0 L 532.7 381.9 L 532.8 380.7 L 534.2 380.9 L 535.3 379.6 L 537.2 379.1 L 539.3 376.8 L 538.9 376.2 L 539.3 375.4 L 537.8 371.8 L 538.6 369.1 L 537.6 368.6 L 538.9 367.1 L 536.4 362.0 L 536.9 359.3 L 536.7 358.3 L 535.6 357.3 L 536.3 355.8 L 535.6 354.7 L 535.7 352.6 L 535.2 351.6 L 536.8 349.7 L 542.5 345.3 L 547.8 330.8 L 547.2 329.7 L 549.4 329.3 L 550.0 328.6 L 549.8 327.3 L 547.6 323.3 L 540.1 323.3 L 540.1 322.5 L 538.4 321.7 L 540.1 321.2 L 541.5 318.9 L 541.0 318.1 L 540.1 317.9 L 540.2 317.1 L 539.5 316.6 L 539.6 315.2 L 541.4 314.7 L 540.6 312.4 L 541.2 311.8 L 541.1 309.6 L 543.5 307.1 L 544.1 305.4 L 545.3 304.6 L 545.1 303.9 L 545.6 303.7 L 543.8 299.9 L 542.9 299.3 L 543.2 298.9 L 544.3 299.1 L 545.3 297.1 L 544.1 295.6 L 545.0 295.5 L 545.4 294.6 L 543.9 291.7 L 544.9 290.6 L 545.9 291.4 L 545.5 289.9 L 546.2 289.7 L 545.9 287.3 L 544.9 287.9 L 545.6 286.2 L 544.9 286.2 L 544.5 285.5 L 545.6 284.0 L 545.3 283.7 L 544.5 284.5 L 544.5 283.4 L 545.4 283.2 L 544.7 282.4 L 545.4 282.4 L 545.8 281.7 L 546.6 282.0 L 547.0 281.3 L 543.7 279.9 L 543.0 278.8 L 543.9 277.9 L 545.0 278.5 L 545.6 279.7 L 547.0 279.9 L 547.8 279.1 L 547.5 278.3 L 546.2 278.2 L 544.3 277.0 L 544.1 275.7 L 546.1 275.3 L 546.9 274.2 L 546.6 272.2 L 545.7 271.8 L 545.6 270.6 L 544.7 270.1 L 543.9 270.3 L 544.2 271.7 L 543.3 272.7 L 543.9 275.5 L 542.9 276.0 L 540.5 275.2 L 540.9 276.7 L 538.8 277.5 L 539.0 278.7 L 535.1 280.6 L 533.2 282.7 L 530.3 284.6 L 528.3 284.3 L 525.6 285.1 L 524.8 286.3 L 514.7 292.1 L 508.2 293.2 L 503.8 296.0 L 500.3 296.8 L 498.8 300.3 L 497.8 307.1 L 498.1 308.3 L 496.6 312.6 L 495.7 313.0 L 494.5 311.5 L 493.9 311.5 L 492.5 312.8 L 491.1 312.7 L 488.1 313.7 L 488.0 314.2 L 488.9 314.6 L 489.3 315.6 L 490.3 315.5 L 490.5 316.9 L 490.0 317.8 L 487.1 319.4 L 486.6 320.9 L 485.6 320.8 L 485.0 321.9 L 482.1 323.3 L 480.3 323.6 L 478.7 322.5 L 471.0 330.3 L 469.8 332.4 L 468.2 333.0 L 468.8 335.5 L 468.2 335.5 L 467.3 337.0 L 463.2 338.0 L 461.5 339.9 L 460.1 339.7 L 459.3 340.6 L 454.7 342.0 L 453.2 343.2 L 449.5 349.6 L 446.4 352.5 L 446.1 353.8 L 445.0 354.3 L 443.6 357.5 L 441.8 358.5 L 439.2 361.7 L 434.5 365.3 L 434.5 366.2 L 432.9 367.4 L 431.5 371.4 L 426.5 374.3 L 425.3 374.4 L 423.6 376.2 L 421.9 381.6 L 419.9 382.8 L 417.8 381.6 L 415.1 382.6 L 412.9 382.4 L 409.4 383.8 L 410.6 386.5 L 413.7 387.7 L 414.7 392.2 L 412.7 395.0 L 412.8 395.6 L 414.6 397.0 L 415.8 396.9 L 417.1 396.0 L 419.8 396.1 L 419.9 397.6 L 421.3 399.5 L 420.7 401.2 L 424.7 400.9 L 425.1 401.3 L 425.6 400.9 L 426.3 401.7 L 426.9 404.6 L 428.1 405.2 L 428.3 406.8 L 431.3 410.3 L 433.4 410.2 L 436.9 411.0 L 440.8 409.4 L 444.6 410.8 L 447.0 408.9 L 449.1 404.7 L 450.3 404.7 L 451.6 406.6 L 454.1 405.9 L 463.0 407.7 L 464.1 408.4 L 465.1 407.9 L 478.9 407.2 L 480.1 405.5 L 484.3 406.8 Z",
            "cx": 502.4,
            "cy": 350.8
      },
      {
            "id": "cercado",
            "name": "Cercado (Cochabamba Ciudad)",
            "provinceName": "Provincia Cercado (Capital Departamental)",
            "capital": "Cochabamba",
            "regionId": "metropolitana",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#6366f1",
            "logoColorName": "Índigo Metropolitano",
            "gradient": "gradMetro",
            "aliases": [
                  "cercado",
                  "cochabamba-cercado",
                  "cochabamba"
            ],
            "role": "Capital Departamental, Corazón de los Valles y Capital Gastronómica de Bolivia",
            "distanceKm": 0,
            "travelTime": "Punto de Partida (Km 0)",
            "routeAccess": "Eje distribuidor central de la Red Vial Fundamental (Rutas 4 y 1)",
            "federation": "Asociaciones de Productores y Federación de Empresarios Privados de Cochabamba",
            "venueLocation": "Centro de Prensa FITROP Cochabamba",
            "altitudeMeters": 2558,
            "surfaceKm2": "391 km²",
            "climate": "Templado primaveral seco (15°C - 26°C)",
            "keyProducts": [
                  "Gastronomía Típica (Silpancho, Pique Macho, Chicharrón)",
                  "Comercio Mayorista y Minorista de La Cancha",
                  "Industria Manufacturera y Tecnológica",
                  "Servicios Financieros y Transporte Nacional"
            ],
            "tourismAttractions": [
                  "Monumento al Cristo de la Concordia (Cerro San Pedro)",
                  "Colina Histórica de la Coronilla (Heroínas de la Coronilla)",
                  "Palacio Portales (Fundación Simón I. Patiño)",
                  "Mercado La Cancha (el más grande a cielo abierto)",
                  "Catedral Metropolitana y Plaza 14 de Septiembre"
            ],
            "highlight": "Capital del departamento y epicentro gastronómico nacional. Punto de encuentro donde convergen las delegaciones internacionales rumbo al Trópico.",
            "searchKeywords": "cercado cochabamba cristo concordia coronilla la cancha silpancho pique macho gastronomia capital metropolitana",
            "path": "M 357.9 409.1 L 357.9 407.6 L 359.3 407.4 L 360.2 406.2 L 362.6 405.4 L 363.5 404.2 L 365.4 404.1 L 366.7 402.0 L 369.6 399.8 L 368.9 398.3 L 366.5 395.8 L 365.0 392.6 L 363.8 392.6 L 362.2 389.4 L 360.0 387.8 L 358.3 383.4 L 356.6 382.2 L 357.2 381.3 L 357.7 374.3 L 359.2 371.9 L 359.8 372.0 L 360.3 370.0 L 358.8 366.5 L 358.7 363.2 L 357.6 360.9 L 356.1 361.1 L 352.3 359.9 L 351.4 360.2 L 350.5 361.5 L 349.0 364.3 L 348.8 366.3 L 346.1 370.7 L 346.1 373.6 L 343.9 380.2 L 342.1 379.3 L 341.9 384.7 L 340.6 385.0 L 339.9 390.8 L 339.0 390.9 L 338.5 389.4 L 337.3 389.1 L 334.4 391.3 L 333.0 394.6 L 327.8 398.9 L 329.1 401.4 L 332.2 404.4 L 332.9 406.0 L 335.0 407.4 L 341.3 407.1 L 343.5 407.8 L 351.1 412.0 L 355.2 409.5 L 356.9 409.7 L 357.9 409.1 Z",
            "cx": 351.6,
            "cy": 383.8
      },
      {
            "id": "quillacollo",
            "name": "Quillacollo",
            "provinceName": "Provincia Quillacollo",
            "capital": "Quillacollo",
            "regionId": "metropolitana",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#4338ca",
            "logoColorName": "Índigo Profundo",
            "gradient": "gradMetro",
            "aliases": [
                  "quillacollo"
            ],
            "role": "Capital de la Integración Nacional y Santuario de la Virgen de Urkupiña",
            "distanceKm": 13,
            "travelTime": "25min desde Cochabamba Ciudad",
            "routeAccess": "Avenida Blanco Galindo y Carretera a Oruro - La Paz (Ruta 4)",
            "federation": "Central Provincial de Trabajadores Campesinos de Quillacollo",
            "venueLocation": "Distrito Industrial y Artesanal de Quillacollo",
            "altitudeMeters": 2540,
            "surfaceKm2": "720 km²",
            "climate": "Templado valluno",
            "keyProducts": [
                  "Industria Agroalimentaria y Lácteos",
                  "Maíz Forrajero y Granos",
                  "Artesanía en Tejidos y Yeso",
                  "Gastronomía Valluna (Lechón al Horno)"
            ],
            "tourismAttractions": [
                  "Santuario de la Virgen de Urkupiña y Calvario del Cerro Cota",
                  "Aguas Termales de Liriuni",
                  "Sitio Arqueológico de las Qollqas de Cotapachi",
                  "Cordillera del Tunari"
            ],
            "highlight": "Epicentro de la fiesta de la integración nacional de Urkupiña y pujante centro agroindustrial del Valle Bajo.",
            "searchKeywords": "quillacollo urkupina cota liriuni cotapachi lechon valle bajo industria",
            "path": "M 305.3 448.3 L 306.7 448.9 L 307.2 450.1 L 308.8 450.8 L 310.3 453.6 L 310.4 455.0 L 312.3 457.4 L 313.5 457.5 L 316.7 455.8 L 316.7 453.5 L 315.9 452.0 L 316.7 448.2 L 315.6 446.3 L 314.1 445.2 L 315.5 442.8 L 313.9 439.3 L 314.2 438.5 L 317.8 437.9 L 318.9 436.4 L 319.1 433.1 L 320.5 431.8 L 322.3 431.1 L 327.1 426.4 L 325.5 423.4 L 321.7 419.1 L 322.8 411.9 L 321.5 410.4 L 321.0 407.7 L 318.3 403.2 L 319.2 402.2 L 328.7 400.8 L 327.8 398.9 L 333.0 394.6 L 334.4 391.3 L 337.6 389.0 L 338.5 389.4 L 339.0 390.9 L 339.9 390.8 L 340.6 385.0 L 341.9 384.7 L 342.1 379.3 L 343.9 380.2 L 346.1 373.6 L 346.1 370.7 L 348.8 366.3 L 349.0 364.3 L 351.0 360.7 L 352.3 359.9 L 355.3 355.5 L 353.4 354.3 L 349.6 355.1 L 346.6 353.3 L 346.3 350.4 L 345.6 349.0 L 346.2 344.6 L 352.3 339.3 L 352.2 338.4 L 353.8 336.7 L 355.9 337.2 L 357.4 334.6 L 359.7 334.2 L 358.1 329.1 L 358.0 326.8 L 358.4 325.5 L 360.7 323.3 L 362.2 322.6 L 363.7 319.9 L 364.5 319.4 L 364.8 318.4 L 363.5 317.4 L 363.3 316.4 L 358.4 319.2 L 356.0 319.2 L 350.5 317.4 L 347.7 317.1 L 340.9 318.1 L 340.2 319.0 L 338.8 319.2 L 335.7 317.2 L 332.3 319.6 L 329.9 316.9 L 328.6 314.5 L 323.4 311.8 L 322.7 310.9 L 319.4 313.3 L 317.9 317.1 L 315.1 317.6 L 311.5 312.2 L 310.4 311.3 L 307.3 311.2 L 306.9 312.8 L 305.8 313.7 L 304.4 313.9 L 304.0 314.8 L 299.6 317.6 L 297.6 319.7 L 296.7 322.1 L 295.9 322.8 L 295.4 328.2 L 294.7 328.3 L 292.1 330.9 L 292.7 333.4 L 292.5 334.5 L 291.3 335.8 L 291.5 339.6 L 293.8 341.8 L 295.8 342.7 L 298.1 346.5 L 300.3 347.4 L 303.4 346.3 L 303.8 348.2 L 303.5 352.7 L 299.9 356.8 L 295.1 356.3 L 292.6 357.3 L 292.7 360.5 L 290.2 362.6 L 287.2 361.9 L 285.5 367.8 L 284.8 373.6 L 283.1 377.2 L 278.9 378.2 L 276.3 382.9 L 275.5 382.9 L 276.4 383.9 L 279.8 385.6 L 281.0 387.6 L 281.6 387.7 L 283.2 386.4 L 284.2 387.9 L 285.2 388.0 L 283.8 392.3 L 284.3 397.2 L 285.0 397.9 L 287.0 397.5 L 290.5 400.2 L 292.7 400.6 L 298.7 404.3 L 300.2 402.7 L 301.0 402.6 L 301.5 403.9 L 304.0 403.9 L 304.6 405.7 L 305.7 406.9 L 305.2 409.2 L 305.6 412.4 L 307.2 418.6 L 306.3 418.8 L 305.6 417.8 L 303.0 416.7 L 297.9 415.9 L 295.4 417.1 L 293.9 419.5 L 292.9 419.4 L 292.4 420.0 L 291.0 418.7 L 289.4 418.7 L 289.2 418.1 L 288.3 418.7 L 295.5 424.3 L 296.3 426.0 L 297.6 426.1 L 297.8 429.0 L 297.2 429.8 L 297.8 430.9 L 298.9 431.7 L 300.5 430.2 L 302.5 430.6 L 304.3 436.0 L 305.9 437.8 L 307.4 438.4 L 307.2 439.7 L 304.8 441.3 L 303.4 444.2 L 303.8 446.4 L 305.3 448.3 Z",
            "cx": 315.4,
            "cy": 380.6
      },
      {
            "id": "punata",
            "name": "Punata",
            "provinceName": "Provincia Punata (La Perla del Valle)",
            "capital": "Punata",
            "regionId": "valles",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#f59e0b",
            "logoColorName": "Ámbar Valluno",
            "gradient": "gradValles",
            "aliases": [
                  "punata"
            ],
            "role": "Perla del Valle Alto, Tradición de Rosquetes, Granos y Ferias Ganaderas",
            "distanceKm": 48,
            "travelTime": "1h 10min desde Cochabamba Ciudad",
            "routeAccess": "Carretera Antigua al Valle Alto asfaltada",
            "federation": "Central Sindical Única de Trabajadores Campesinos de Punata",
            "venueLocation": "Recinto Ferial de Punata",
            "altitudeMeters": 2730,
            "surfaceKm2": "132 km²",
            "climate": "Templado y soleado de valle interandino",
            "keyProducts": [
                  "Rosquete Punateño Tradicional",
                  "Pan de Toco y Repostería de Valle",
                  "Producción de Maíz Amarillo y Choclo",
                  "Ganadería Bovina y Feria de Ganado de los Martes",
                  "Chicha Tradicional Kulli"
            ],
            "tourismAttractions": [
                  "Templo San Juan Bautista (Monumento Nacional)",
                  "Feria Tradicional de Ganado y Granos",
                  "Ruta de las Haciendas Coloniales",
                  "Molinos Hidráulicos Ancestrales"
            ],
            "highlight": "Conocida como La Perla del Valle, famosa en toda Bolivia por sus rosquetes de clara de huevo y su imponente feria ganadera.",
            "searchKeywords": "punata perla del valle rosquetes toco maiz chicha ganaderia valle alto san juan bautista",
            "path": "M 431.3 410.3 L 428.3 406.8 L 428.1 405.2 L 426.9 404.6 L 426.3 401.7 L 425.6 400.9 L 425.1 401.3 L 424.7 400.9 L 420.7 401.2 L 421.3 399.5 L 419.9 397.6 L 419.8 396.1 L 417.1 396.0 L 415.8 396.9 L 414.6 397.0 L 412.6 395.3 L 413.5 393.9 L 410.7 393.6 L 407.2 393.9 L 406.2 395.8 L 401.9 398.7 L 397.6 401.2 L 396.3 400.5 L 394.6 402.2 L 394.5 403.6 L 395.5 405.3 L 394.9 405.6 L 393.8 408.2 L 393.2 412.3 L 394.4 415.4 L 395.3 415.0 L 395.7 415.4 L 396.6 414.7 L 397.6 415.0 L 399.3 417.0 L 399.5 418.7 L 400.6 419.1 L 400.4 420.3 L 401.0 420.8 L 402.2 421.3 L 405.0 421.0 L 404.8 422.0 L 406.3 424.3 L 406.4 428.5 L 409.4 428.9 L 407.5 432.8 L 406.0 433.0 L 406.0 434.3 L 404.8 435.9 L 403.5 439.5 L 403.8 442.5 L 405.2 444.1 L 404.9 445.2 L 405.6 446.1 L 405.5 446.9 L 407.3 448.1 L 408.2 448.1 L 408.6 449.7 L 410.8 452.6 L 413.0 453.3 L 413.7 452.9 L 414.0 451.2 L 416.4 450.2 L 418.0 447.8 L 419.3 446.9 L 420.7 447.6 L 422.0 446.1 L 422.6 446.1 L 422.9 447.6 L 423.9 447.9 L 424.5 449.0 L 426.1 448.6 L 428.6 450.4 L 428.1 452.1 L 428.4 454.3 L 429.0 455.8 L 430.5 457.1 L 430.5 457.8 L 432.3 457.4 L 435.2 458.4 L 437.3 456.1 L 438.6 456.7 L 440.6 456.2 L 439.9 455.2 L 439.4 452.4 L 434.3 449.3 L 436.0 444.3 L 437.1 443.0 L 437.0 441.7 L 434.9 437.2 L 432.7 435.1 L 425.2 429.9 L 424.6 428.3 L 423.5 427.5 L 421.2 426.9 L 421.8 425.7 L 422.7 418.8 L 423.3 418.9 L 423.0 416.6 L 424.5 416.1 L 425.2 416.5 L 428.5 414.2 L 431.3 410.3 Z",
            "cx": 416.1,
            "cy": 423.2
      },
      {
            "id": "arani",
            "name": "Arani",
            "provinceName": "Provincia Arani (Tierra del Pan y del Viento)",
            "capital": "Arani",
            "regionId": "valles",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#b45309",
            "logoColorName": "Dorado Trigo",
            "gradient": "gradValles",
            "aliases": [
                  "arani"
            ],
            "role": "Tierra del Pan Gigante Mama Qonqachi y Santuario de la Virgen la Bella",
            "distanceKm": 56,
            "travelTime": "1h 20min desde Cochabamba Ciudad",
            "routeAccess": "Carretera hacia Arani y Vacas asfaltada",
            "federation": "Central Provincial Campesina de Arani",
            "venueLocation": "Plaza Principal de Arani",
            "altitudeMeters": 2760,
            "surfaceKm2": "506 km²",
            "climate": "Templado fresco",
            "keyProducts": [
                  "Pan de Arani (Mama Qonqachi y Chamillos)",
                  "Trigo Criollo y Cebada de Altura",
                  "Durazno y Frutas de Valle",
                  "Piscicultura de Trucha en las Lagunas de Vacas"
            ],
            "tourismAttractions": [
                  "Santuario de la Virgen la Bella",
                  "Circuito de las Lagunas de Vacas (Parcko Khocha)",
                  "Hornos Tradicionales de Barro de Panadería",
                  "Convento Franciscano Santa Ana"
            ],
            "highlight": "Cuna del legendario Pan de Arani horneado a la leña y del santuario mariano de la Virgen la Bella.",
            "searchKeywords": "arani pan mama qonqachi virgen la bella lagunas vacas trigo hornos valle alto",
            "path": "M 484.3 406.8 L 480.1 405.5 L 478.9 407.2 L 465.1 407.9 L 464.1 408.4 L 463.0 407.7 L 454.1 405.9 L 451.6 406.6 L 450.3 404.7 L 449.1 404.7 L 447.0 408.9 L 444.6 410.8 L 440.8 409.4 L 436.9 411.0 L 433.4 410.2 L 431.3 410.3 L 428.5 414.2 L 425.2 416.5 L 424.5 416.1 L 423.0 416.6 L 423.3 418.9 L 422.7 418.8 L 421.8 425.7 L 421.2 426.9 L 424.6 428.3 L 425.2 429.9 L 432.7 435.1 L 434.9 437.2 L 437.8 443.9 L 440.0 444.0 L 442.4 445.2 L 443.3 445.0 L 444.5 443.3 L 448.7 442.3 L 451.7 438.5 L 456.3 440.7 L 459.3 443.1 L 466.7 445.9 L 468.5 447.6 L 473.6 450.4 L 480.4 448.1 L 481.7 447.2 L 483.0 440.1 L 484.1 438.6 L 485.6 437.7 L 486.1 436.6 L 484.2 435.4 L 482.0 432.2 L 478.9 430.3 L 478.7 428.3 L 477.0 427.1 L 476.9 423.7 L 475.7 421.8 L 475.1 419.1 L 475.7 417.1 L 476.8 417.6 L 478.8 416.8 L 480.4 417.5 L 484.3 414.5 L 485.0 413.4 L 487.2 414.7 L 489.2 417.2 L 492.7 419.4 L 495.4 416.8 L 495.8 415.6 L 489.8 411.6 L 487.5 409.4 L 484.7 408.6 L 484.3 406.8 Z",
            "cx": 461.3,
            "cy": 423.5
      },
      {
            "id": "esteban-arce",
            "name": "Esteban Arce (Tarata)",
            "provinceName": "Provincia Esteban Arce",
            "capital": "Tarata",
            "regionId": "valles",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#d97706",
            "logoColorName": "Ocre Colonial",
            "gradient": "gradValles",
            "aliases": [
                  "esteban-arce",
                  "tarata"
            ],
            "role": "Villa Colonial Histórica de Tarata, Ciudad de los Presidentes y Alfarería",
            "distanceKm": 35,
            "travelTime": "50min desde Cochabamba Ciudad",
            "routeAccess": "Carretera asfaltada Cochabamba - Tarata - Anzaldo",
            "federation": "Central Sindical de Trabajadores Campesinos Esteban Arce",
            "venueLocation": "Centro Histórico Patrimonial de Tarata",
            "altitudeMeters": 2750,
            "surfaceKm2": "1,245 km²",
            "climate": "Templado seco",
            "keyProducts": [
                  "Chorizo Tarateño Tradicional",
                  "Alfarería y Cerámica Artesanal de Huayculi",
                  "Maíz, Trigo y Cebolla Criolla",
                  "Tejidos Autóctonos de Valle"
            ],
            "tourismAttractions": [
                  "Convento Franciscano San José de Tarata",
                  "Templo San Pedro y Cripta del General Esteban Arze",
                  "Comunidad Alfarera de Huayculi",
                  "Represa de La Angostura (deportes náuticos y gastronomía de pescado)"
            ],
            "highlight": "Villa histórica cuna de ilustres presidentes y de héroes de la independencia patria, con tesoros de alfarería en Huayculi.",
            "searchKeywords": "esteban arce tarata huayculi chorizo angostura convento alfareria presidentes historia",
            "path": "M 364.2 471.2 L 366.1 471.7 L 367.1 472.5 L 367.5 473.7 L 371.8 475.4 L 373.3 477.2 L 374.9 477.8 L 375.4 479.4 L 376.5 480.1 L 376.5 481.1 L 378.6 483.0 L 378.9 485.0 L 380.3 485.4 L 380.4 487.7 L 383.3 492.9 L 385.3 494.6 L 386.0 498.1 L 388.8 499.6 L 390.7 501.8 L 391.6 501.8 L 392.2 500.4 L 393.5 500.8 L 393.9 502.1 L 395.1 502.5 L 395.5 503.8 L 395.1 506.9 L 395.5 507.8 L 396.9 508.3 L 397.1 510.1 L 398.6 510.5 L 401.3 509.8 L 402.5 508.9 L 404.8 509.0 L 405.2 508.3 L 406.3 508.1 L 406.2 507.4 L 408.8 507.0 L 410.5 505.5 L 413.6 506.7 L 414.8 506.3 L 416.6 508.9 L 417.8 509.1 L 418.4 511.0 L 420.7 512.1 L 421.3 513.4 L 422.7 513.9 L 423.8 513.7 L 424.2 512.5 L 425.7 511.9 L 427.7 509.5 L 429.5 508.9 L 429.8 506.5 L 429.2 503.7 L 427.9 503.3 L 427.6 502.2 L 426.1 502.1 L 425.5 500.4 L 424.3 500.0 L 423.1 498.2 L 421.2 497.2 L 421.4 496.6 L 422.0 496.6 L 423.3 493.3 L 425.0 492.3 L 425.8 490.6 L 424.3 489.4 L 423.2 487.5 L 422.7 483.6 L 424.0 481.7 L 425.3 482.7 L 426.0 482.5 L 426.4 479.5 L 428.6 482.3 L 429.4 482.1 L 430.5 483.2 L 434.6 484.4 L 435.9 482.5 L 435.7 480.7 L 439.2 478.8 L 441.5 478.6 L 442.0 477.9 L 441.7 476.4 L 439.5 475.1 L 439.2 469.8 L 439.7 464.4 L 441.3 462.2 L 442.6 458.4 L 441.3 456.1 L 440.6 456.0 L 438.6 456.7 L 437.3 456.1 L 435.2 458.4 L 432.3 457.4 L 430.5 457.8 L 430.5 457.1 L 429.0 455.8 L 428.4 454.3 L 428.1 452.1 L 428.6 450.4 L 426.1 448.6 L 424.5 449.0 L 423.9 447.9 L 422.9 447.6 L 422.9 446.3 L 422.2 446.0 L 420.7 447.6 L 419.3 446.9 L 418.0 447.8 L 416.4 450.2 L 414.0 451.2 L 413.7 452.9 L 413.0 453.3 L 410.8 452.6 L 408.6 449.7 L 408.2 448.1 L 405.8 447.2 L 405.0 445.3 L 404.7 446.1 L 402.7 445.8 L 401.8 446.4 L 401.4 447.7 L 401.8 451.3 L 400.8 450.7 L 400.4 451.0 L 400.1 450.2 L 398.6 450.0 L 398.6 449.5 L 397.3 448.8 L 397.8 448.7 L 398.0 447.4 L 397.4 445.9 L 396.7 445.7 L 396.7 444.6 L 395.7 443.8 L 394.1 443.6 L 393.5 440.7 L 392.0 439.6 L 392.7 438.0 L 390.2 434.9 L 388.9 434.2 L 389.0 432.6 L 391.7 430.3 L 392.5 427.8 L 392.4 426.6 L 390.7 425.2 L 390.3 423.5 L 388.4 421.5 L 385.5 419.7 L 383.4 416.5 L 380.7 416.6 L 371.1 418.8 L 367.7 415.6 L 370.6 412.7 L 370.4 411.3 L 372.1 410.0 L 373.8 411.1 L 374.4 410.9 L 374.3 408.0 L 375.2 406.6 L 374.6 405.2 L 372.3 405.4 L 370.6 403.9 L 370.7 402.7 L 369.6 400.0 L 366.7 402.0 L 365.4 404.1 L 363.5 404.2 L 362.6 405.4 L 360.2 406.2 L 359.3 407.4 L 357.9 407.6 L 358.7 416.8 L 357.3 419.1 L 358.1 420.8 L 356.0 425.6 L 357.6 430.7 L 353.7 437.4 L 352.1 442.9 L 353.3 444.4 L 352.2 444.5 L 351.5 445.2 L 351.7 446.1 L 354.0 447.9 L 353.1 450.2 L 353.3 451.6 L 355.1 452.9 L 355.2 454.4 L 356.9 456.9 L 357.4 456.9 L 357.7 458.4 L 358.0 465.4 L 356.6 467.1 L 355.6 467.4 L 355.6 468.4 L 357.9 468.7 L 359.2 468.2 L 360.4 469.4 L 361.5 469.2 L 361.8 469.9 L 364.1 470.3 L 364.2 471.2 Z",
            "cx": 397.4,
            "cy": 463.2
      },
      {
            "id": "german-jordan",
            "name": "Germán Jordán (Cliza)",
            "provinceName": "Provincia Germán Jordán",
            "capital": "Cliza",
            "regionId": "valles",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#b45309",
            "logoColorName": "Tostado Chicha",
            "gradient": "gradValles",
            "aliases": [
                  "german-jordan",
                  "cliza"
            ],
            "role": "Cuna del Pichón Tradicional, Chicha de Valle y Revolución Agraria de Ucureña",
            "distanceKm": 40,
            "travelTime": "1h desde Cochabamba Ciudad",
            "routeAccess": "Carretera del Valle Alto asfaltada",
            "federation": "Central Campesina de Cliza y Núcleo Histórico de Ucureña",
            "venueLocation": "Plaza 21 de Septiembre de Cliza",
            "altitudeMeters": 2720,
            "surfaceKm2": "105 km²",
            "climate": "Templado seco valluno",
            "keyProducts": [
                  "Pichón al Horno y a las Brasas",
                  "Chicha Cliceña Tradicional",
                  "Maíz Choclo y Cultivos Forrajeros",
                  "Feria Dominical Agropecuaria"
            ],
            "tourismAttractions": [
                  "Monumento Histórico de Ucureña (Firma del Decreto de Reforma Agraria)",
                  "Mercado Central y Comedores de Pichón de Cliza",
                  "Templo Nuestra Señora del Carmen",
                  "Rutas Campesinas del Valle Alto"
            ],
            "highlight": "Tierra emblemática de la Reforma Agraria en Ucureña y capital del afamado pichón cliceño.",
            "searchKeywords": "german jordan cliza ucurena pichon chicha reforma agraria valle alto choclo",
            "path": "M 375.2 406.6 L 374.3 408.0 L 374.4 410.9 L 373.8 411.1 L 372.1 410.0 L 370.4 411.3 L 370.6 412.7 L 367.7 415.6 L 371.1 418.8 L 380.7 416.6 L 383.4 416.5 L 385.5 419.7 L 388.8 421.9 L 390.3 423.5 L 390.7 425.2 L 392.5 426.8 L 392.2 429.5 L 390.6 431.6 L 389.0 432.6 L 388.9 434.2 L 390.2 434.9 L 392.7 438.0 L 392.0 439.6 L 393.5 440.7 L 394.1 443.6 L 395.7 443.8 L 396.7 444.6 L 396.7 445.7 L 397.4 445.9 L 398.0 447.4 L 397.8 448.7 L 397.3 448.8 L 398.6 449.5 L 398.6 450.0 L 400.1 450.2 L 400.4 451.0 L 400.8 450.7 L 401.8 451.3 L 401.8 448.2 L 401.4 447.8 L 401.8 446.4 L 402.7 445.8 L 404.7 446.1 L 405.2 444.4 L 403.8 442.5 L 403.5 439.5 L 404.8 435.9 L 406.0 434.3 L 406.0 433.0 L 407.5 432.8 L 409.4 428.9 L 406.4 428.5 L 406.3 424.3 L 404.8 422.0 L 405.0 421.0 L 402.2 421.3 L 401.0 420.8 L 400.4 420.3 L 400.6 419.1 L 399.5 418.7 L 399.3 417.0 L 397.6 415.0 L 396.6 414.7 L 395.7 415.4 L 395.4 415.0 L 394.3 415.3 L 393.4 413.3 L 393.2 411.0 L 394.5 406.4 L 395.5 405.3 L 394.5 403.6 L 394.6 402.2 L 393.1 401.8 L 391.7 403.5 L 386.4 406.5 L 385.7 407.4 L 383.2 408.0 L 375.8 407.9 L 375.2 406.6 Z",
            "cx": 393.5,
            "cy": 430.6
      },
      {
            "id": "capinota",
            "name": "Capinota",
            "provinceName": "Provincia Capinota",
            "capital": "Capinota",
            "regionId": "valles",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#78350f",
            "logoColorName": "Terracota Industrial",
            "gradient": "gradValles",
            "aliases": [
                  "capinota"
            ],
            "role": "Polo de Cemento Coboce, Viñedos y Producción de Hortalizas en Riberas",
            "distanceKm": 65,
            "travelTime": "1h 30min desde Cochabamba Ciudad",
            "routeAccess": "Carretera hacia Santiváñez y Capinota asfaltada",
            "federation": "Central Única Campesina de Capinota",
            "venueLocation": "Distrito Agroindustrial de Capinota",
            "altitudeMeters": 2410,
            "surfaceKm2": "1,495 km²",
            "climate": "Templado abrigado de ribera",
            "keyProducts": [
                  "Cemento y Materiales de Construcción (Coboce)",
                  "Uva de Mesa y Vinos Artesanales de Valle",
                  "Papa, Maíz y Hortalizas de Riego",
                  "Sandía y Melón en Ribera de Río"
            ],
            "tourismAttractions": [
                  "Viñedos y Bodegas Artesanales de Capinota",
                  "Parque Industrial Santiváñez",
                  "Confluencia de los Ríos Rocha y Arque",
                  "Balnearios Naturales de Agua Tibia"
            ],
            "highlight": "Fértil ribera que conjuga la potencia cementera de Coboce con viñedos tradicionales y hortalizas de alta calidad.",
            "searchKeywords": "capinota coboce cemento viñedos vino santivanez uva hortalizas valles",
            "path": "M 333.2 497.9 L 334.1 501.8 L 336.2 500.9 L 338.3 501.7 L 339.7 498.6 L 341.4 498.1 L 341.6 497.4 L 342.9 497.2 L 344.1 496.2 L 347.1 497.7 L 350.1 496.4 L 350.6 495.8 L 350.4 493.9 L 351.2 493.1 L 350.8 492.1 L 352.2 491.4 L 351.8 490.5 L 354.3 487.4 L 356.8 486.0 L 360.3 481.9 L 360.3 477.5 L 363.2 471.6 L 364.3 470.7 L 363.1 469.9 L 361.8 469.9 L 361.5 469.2 L 360.4 469.4 L 359.2 468.2 L 355.7 468.6 L 355.6 467.4 L 356.6 467.1 L 358.0 465.4 L 357.7 458.4 L 357.4 456.9 L 356.9 456.9 L 355.2 454.4 L 355.1 452.9 L 353.3 451.6 L 353.1 450.2 L 354.0 447.9 L 351.7 446.1 L 351.5 445.2 L 352.2 444.5 L 353.3 444.4 L 352.1 442.9 L 353.7 437.4 L 357.6 430.7 L 356.0 425.6 L 358.1 420.8 L 357.3 419.1 L 358.7 416.8 L 358.6 411.9 L 357.9 409.1 L 356.9 409.7 L 355.2 409.5 L 351.1 412.0 L 343.5 407.8 L 341.3 407.1 L 335.0 407.4 L 332.9 406.0 L 332.2 404.4 L 328.7 400.8 L 319.2 402.2 L 318.3 403.2 L 321.0 407.7 L 321.5 410.4 L 322.8 411.9 L 321.7 419.1 L 325.5 423.4 L 327.1 426.4 L 322.3 431.1 L 320.5 431.8 L 319.1 433.1 L 318.9 436.4 L 317.8 437.9 L 314.2 438.5 L 313.9 439.3 L 315.5 442.8 L 314.1 445.2 L 315.6 446.3 L 316.7 448.2 L 315.9 450.7 L 316.0 452.4 L 316.7 453.5 L 316.7 455.8 L 313.5 457.5 L 312.3 457.4 L 310.4 455.0 L 310.3 453.6 L 308.8 450.8 L 307.2 450.1 L 306.7 448.9 L 305.3 448.3 L 302.4 449.5 L 302.0 450.5 L 303.4 452.4 L 304.4 452.8 L 305.0 456.0 L 306.9 459.2 L 306.8 462.6 L 304.9 464.4 L 304.7 465.4 L 306.2 468.2 L 310.0 470.2 L 311.2 471.4 L 311.3 472.3 L 310.0 473.5 L 310.7 475.9 L 311.9 476.1 L 314.0 478.3 L 314.5 481.9 L 315.8 484.2 L 317.3 484.7 L 323.9 483.8 L 327.5 482.7 L 328.1 486.2 L 329.6 490.3 L 331.7 493.5 L 333.2 497.9 Z",
            "cx": 333.9,
            "cy": 456.1
      },
      {
            "id": "ayopaya",
            "name": "Ayopaya (Independencia)",
            "provinceName": "Provincia Ayopaya (Norte Andino)",
            "capital": "Independencia",
            "regionId": "andina",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#0891b2",
            "logoColorName": "Turquesa Glaciar",
            "gradient": "gradAndina",
            "aliases": [
                  "ayopaya",
                  "ayopaya-independencia",
                  "independencia"
            ],
            "role": "República Patriota de Ayopaya, Bosques de Queñuas y Riqueza de Altura",
            "distanceKm": 185,
            "travelTime": "5h desde Cochabamba Ciudad",
            "routeAccess": "Carretera de montaña Cochabamba - Independencia",
            "federation": "Federación Sindical Única de Trabajadores Campesinos de Ayopaya",
            "venueLocation": "Plaza de la Independencia",
            "altitudeMeters": 2650,
            "surfaceKm2": "9,620 km²",
            "climate": "Valle interandino a puna glaciar",
            "keyProducts": [
                  "Papas Nativas Variadas (Waych'a, Imilla, Qhati)",
                  "Ganado Camélido (Llama y Alpaca)",
                  "Trucha de Ríos Andinos",
                  "Yeso, Cal y Minerales No Metálicos"
            ],
            "tourismAttractions": [
                  "Bosques Milenarios de Queñuas en Cocapata",
                  "Cañones Geológicos de Independencia",
                  "Aguas Termales Vírgenes de Morochata",
                  "Rutas Libertarias de la Republiqueta de Ayopaya"
            ],
            "highlight": "El territorio más extenso de las altas montañas de Cochabamba, cuna de los patriotas de la Republiqueta de Ayopaya.",
            "searchKeywords": "ayopaya independencia cocapata morochata queñuas papas nativas camelidos cordillera andina",
            "path": "M 224.0 46.1 L 222.5 45.9 L 221.2 45.0 L 220.5 45.5 L 220.6 46.3 L 217.8 46.8 L 215.7 48.5 L 210.9 45.7 L 210.3 47.3 L 208.4 48.4 L 204.6 53.4 L 203.9 53.5 L 202.9 56.6 L 201.5 58.5 L 201.5 59.4 L 202.8 59.6 L 203.0 60.9 L 202.3 62.2 L 202.7 63.5 L 205.6 64.6 L 206.4 65.7 L 206.4 68.1 L 204.9 69.5 L 208.1 74.2 L 207.2 75.1 L 207.4 75.7 L 209.3 77.7 L 207.9 78.2 L 207.3 79.4 L 206.3 78.9 L 205.4 80.6 L 204.0 81.2 L 203.0 83.0 L 202.0 83.4 L 201.8 84.7 L 200.2 87.0 L 201.0 89.5 L 199.0 90.6 L 198.6 91.4 L 199.6 92.2 L 200.3 94.5 L 199.9 96.1 L 200.7 98.2 L 200.4 100.2 L 201.2 100.9 L 200.4 103.7 L 200.9 104.8 L 199.4 105.9 L 198.9 110.5 L 199.3 111.3 L 200.5 111.7 L 201.0 113.3 L 202.4 113.0 L 203.3 114.8 L 204.1 114.8 L 205.1 115.8 L 205.2 117.4 L 206.1 117.9 L 206.5 119.5 L 207.8 120.4 L 208.1 122.3 L 209.4 123.1 L 208.9 125.0 L 210.4 125.9 L 214.3 132.5 L 213.9 135.2 L 212.7 136.8 L 213.7 139.4 L 212.6 140.1 L 213.0 141.5 L 212.8 142.6 L 212.3 142.7 L 213.3 144.5 L 216.5 146.3 L 217.8 147.9 L 219.2 147.9 L 219.1 149.1 L 219.8 150.4 L 221.3 150.8 L 223.0 153.4 L 222.9 154.7 L 222.3 155.1 L 224.1 163.6 L 223.3 165.1 L 224.0 168.1 L 224.1 175.0 L 225.2 176.9 L 224.8 177.9 L 225.9 178.3 L 226.5 179.5 L 225.4 184.5 L 226.6 189.6 L 226.2 190.5 L 225.4 190.8 L 225.3 193.1 L 229.3 197.4 L 229.4 198.8 L 227.7 200.0 L 227.8 201.0 L 229.3 203.5 L 230.0 203.7 L 230.1 205.4 L 231.2 205.7 L 234.7 211.4 L 234.6 212.7 L 235.6 213.0 L 236.7 215.3 L 236.4 216.6 L 235.5 217.3 L 236.3 220.1 L 235.8 221.9 L 233.8 224.0 L 234.8 227.0 L 234.9 229.3 L 233.7 230.4 L 233.7 231.5 L 232.3 233.4 L 232.0 236.1 L 231.4 237.0 L 231.7 239.3 L 234.5 243.0 L 234.2 244.9 L 234.9 246.0 L 234.0 247.3 L 234.9 250.0 L 232.8 252.9 L 231.2 253.2 L 230.5 255.8 L 229.3 256.5 L 228.1 256.0 L 226.5 257.7 L 226.1 258.5 L 227.0 259.4 L 226.0 260.9 L 225.2 260.8 L 220.5 265.3 L 216.4 267.8 L 214.1 267.8 L 213.3 267.0 L 209.9 266.4 L 206.2 267.3 L 205.5 266.6 L 204.2 266.5 L 202.6 266.6 L 202.1 267.2 L 201.0 266.4 L 200.0 267.0 L 198.2 266.9 L 195.9 270.4 L 194.6 271.2 L 192.6 275.3 L 188.2 278.8 L 187.6 281.0 L 188.8 285.6 L 184.6 287.4 L 184.5 289.2 L 182.2 290.6 L 181.8 292.4 L 182.9 294.4 L 182.5 299.2 L 184.8 304.5 L 186.2 308.9 L 185.9 309.6 L 186.9 311.5 L 191.5 315.3 L 191.6 316.6 L 194.1 319.2 L 196.8 324.0 L 200.1 325.4 L 202.1 327.3 L 204.9 330.9 L 206.1 334.0 L 206.0 340.4 L 205.0 341.4 L 205.0 345.1 L 205.5 346.9 L 206.6 347.8 L 206.5 348.9 L 207.6 351.5 L 207.3 353.7 L 205.3 357.3 L 205.7 358.5 L 205.2 358.8 L 205.2 361.1 L 205.5 362.5 L 206.4 362.7 L 208.5 365.1 L 214.5 368.1 L 213.7 372.1 L 211.8 372.5 L 211.1 373.2 L 211.5 374.6 L 213.2 374.8 L 214.0 375.9 L 213.9 378.2 L 212.7 380.9 L 213.0 381.7 L 216.2 384.6 L 218.3 384.1 L 219.3 384.8 L 221.4 388.8 L 223.8 389.8 L 224.2 392.0 L 226.4 392.3 L 228.0 394.2 L 236.5 395.7 L 240.1 394.0 L 239.1 389.3 L 239.8 387.5 L 246.9 386.8 L 250.2 387.5 L 251.4 388.6 L 253.3 388.8 L 254.0 390.0 L 255.4 390.7 L 258.6 391.3 L 259.9 391.1 L 260.8 389.9 L 260.7 388.2 L 261.5 387.0 L 261.0 386.3 L 261.9 384.8 L 265.1 383.3 L 267.9 380.6 L 269.0 380.7 L 270.1 378.7 L 272.5 380.6 L 272.9 381.8 L 276.3 382.9 L 278.9 378.2 L 283.1 377.2 L 284.8 373.6 L 285.5 367.8 L 287.2 361.9 L 290.2 362.6 L 292.7 360.5 L 292.6 357.3 L 295.1 356.3 L 299.9 356.8 L 303.5 352.7 L 303.8 348.2 L 303.4 346.3 L 300.3 347.4 L 298.1 346.5 L 295.8 342.7 L 293.8 341.8 L 291.5 339.6 L 291.3 335.8 L 292.5 334.5 L 292.7 333.4 L 292.1 330.9 L 294.7 328.3 L 295.4 328.2 L 295.9 322.8 L 296.7 322.1 L 297.6 319.7 L 299.6 317.6 L 304.0 314.8 L 304.4 313.9 L 305.8 313.7 L 306.9 312.8 L 307.3 311.2 L 310.4 311.3 L 311.5 312.2 L 315.1 317.6 L 317.9 317.1 L 319.4 313.3 L 322.7 310.9 L 323.1 307.8 L 320.6 304.5 L 313.4 300.5 L 321.3 295.5 L 324.5 298.5 L 327.0 297.8 L 331.1 294.9 L 330.7 294.3 L 331.4 293.0 L 332.7 292.3 L 333.5 290.9 L 334.9 290.9 L 335.5 290.2 L 337.8 289.5 L 339.9 287.2 L 340.0 284.6 L 336.0 279.5 L 334.7 279.2 L 332.1 277.2 L 330.8 277.4 L 328.0 275.6 L 326.9 275.5 L 325.9 273.8 L 325.7 271.6 L 324.9 271.7 L 324.3 271.1 L 324.3 269.9 L 323.1 269.5 L 323.0 268.4 L 321.1 266.2 L 320.9 260.8 L 321.7 257.3 L 323.0 254.9 L 325.0 254.5 L 326.4 253.3 L 327.5 253.1 L 329.3 251.1 L 331.9 251.0 L 333.9 251.7 L 336.9 253.8 L 341.1 253.1 L 342.8 253.9 L 344.6 253.4 L 345.3 254.1 L 346.5 254.1 L 348.6 252.6 L 348.7 251.9 L 350.3 251.5 L 349.3 250.4 L 349.8 248.4 L 349.6 246.0 L 348.6 245.6 L 348.4 244.2 L 349.3 242.0 L 349.3 240.4 L 348.4 236.6 L 347.1 234.3 L 349.2 231.0 L 347.4 229.6 L 347.8 229.0 L 347.5 228.2 L 348.1 227.9 L 347.4 226.2 L 347.7 225.3 L 345.6 223.1 L 345.4 221.2 L 346.0 220.7 L 345.7 219.1 L 346.2 217.9 L 347.2 217.1 L 349.9 216.4 L 350.4 215.0 L 351.6 213.9 L 351.7 212.8 L 355.3 208.8 L 353.1 207.0 L 352.9 206.1 L 351.1 204.3 L 351.2 201.4 L 349.3 200.9 L 348.2 199.4 L 347.4 200.2 L 346.5 200.2 L 345.6 199.0 L 346.1 198.3 L 345.8 197.5 L 343.0 196.9 L 341.1 194.6 L 340.2 194.9 L 339.2 193.1 L 337.8 192.7 L 336.6 191.5 L 336.1 190.4 L 336.6 189.3 L 335.4 187.7 L 333.7 187.2 L 331.8 187.6 L 327.1 183.8 L 326.6 182.7 L 322.4 179.7 L 322.1 178.9 L 318.0 176.7 L 318.0 175.7 L 318.8 175.2 L 322.2 166.4 L 321.5 155.9 L 321.9 151.7 L 315.6 115.9 L 313.8 115.5 L 312.2 114.0 L 309.9 113.1 L 309.0 111.4 L 303.1 106.9 L 287.9 92.2 L 282.0 88.1 L 269.3 83.0 L 260.1 81.1 L 256.5 77.9 L 255.4 73.6 L 253.8 73.8 L 251.4 71.4 L 249.4 71.5 L 247.9 72.6 L 246.8 70.9 L 241.7 69.0 L 237.2 65.7 L 233.6 61.9 L 229.8 59.0 L 221.6 55.1 L 221.3 53.7 L 222.0 50.6 L 223.7 48.0 L 224.0 46.1 Z",
            "cx": 259.9,
            "cy": 229.9
      },
      {
            "id": "tapacari",
            "name": "Tapacarí",
            "provinceName": "Provincia Tapacarí",
            "capital": "Tapacarí",
            "regionId": "andina",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#0e7490",
            "logoColorName": "Azul Andino",
            "gradient": "gradAndina",
            "aliases": [
                  "tapacari"
            ],
            "role": "Cañones Andinos, Textilería Originaria y Tradición Ancestral de Arrieros",
            "distanceKm": 98,
            "travelTime": "2h 45min desde Cochabamba Ciudad",
            "routeAccess": "Carretera hacia Oruro (Ruta 4) con desvío a Tapacarí",
            "federation": "Central Provincial Campesina de Tapacarí",
            "venueLocation": "Pueblo Histórico de Tapacarí",
            "altitudeMeters": 3000,
            "surfaceKm2": "1,647 km²",
            "climate": "Frío interandino",
            "keyProducts": [
                  "Trigo y Cebada de Altura",
                  "Papas Nativas y Habas",
                  "Crianza de Ovinos y Lanares",
                  "Tejidos Autóctonos en Telar de Fuste"
            ],
            "tourismAttractions": [
                  "Cañón Imponente del Río Tapacarí",
                  "Templo Colonial San Agustín de Tapacarí",
                  "Rutas Ancestrales de Caminos del Inca",
                  "Comunidades Originarias y Ferias de Trueque"
            ],
            "highlight": "Custodia milenaria de cañones andinos y maestras tejedoras de textiles con tintes naturales de origen incaico.",
            "searchKeywords": "tapacari canon rio tapacari tejidos lanares trigo colonial caminos inca andina",
            "path": "M 303.4 444.2 L 304.8 441.3 L 307.2 439.7 L 307.4 438.4 L 305.9 437.8 L 304.3 436.0 L 302.5 430.6 L 300.5 430.2 L 298.9 431.7 L 297.8 430.9 L 297.2 429.8 L 297.8 429.0 L 297.6 426.1 L 296.3 426.0 L 295.5 424.3 L 288.3 418.7 L 289.2 418.1 L 289.4 418.7 L 291.0 418.7 L 292.4 420.0 L 292.9 419.4 L 293.9 419.5 L 295.4 417.1 L 297.9 415.9 L 303.0 416.7 L 305.6 417.8 L 306.3 418.8 L 307.2 418.6 L 305.6 412.4 L 305.2 409.2 L 305.7 406.9 L 304.6 405.7 L 304.0 403.9 L 301.5 403.9 L 301.0 402.6 L 300.2 402.7 L 298.7 404.3 L 292.7 400.6 L 290.5 400.2 L 287.0 397.5 L 285.0 397.9 L 284.3 397.2 L 283.8 392.3 L 285.2 388.0 L 284.2 387.9 L 283.2 386.4 L 281.6 387.7 L 281.0 387.6 L 279.8 385.6 L 272.9 381.8 L 272.5 380.6 L 270.1 378.7 L 269.0 380.7 L 267.9 380.6 L 265.1 383.3 L 261.9 384.8 L 261.0 386.3 L 261.5 387.0 L 260.7 388.2 L 260.8 389.9 L 259.9 391.1 L 255.4 390.7 L 254.0 390.0 L 253.3 388.8 L 251.4 388.6 L 250.2 387.5 L 246.9 386.8 L 239.8 387.5 L 239.1 389.3 L 240.1 394.0 L 236.5 395.7 L 228.0 394.2 L 226.4 392.3 L 224.2 392.0 L 223.8 389.8 L 221.4 388.8 L 219.8 385.3 L 218.3 384.1 L 216.2 384.6 L 213.8 382.3 L 212.2 382.3 L 210.0 383.2 L 209.7 385.9 L 207.6 388.9 L 207.9 390.2 L 210.4 393.1 L 214.3 394.3 L 215.9 396.3 L 215.6 399.3 L 216.1 401.7 L 218.5 405.1 L 218.7 406.4 L 219.8 407.3 L 219.9 409.2 L 218.1 412.0 L 216.1 412.2 L 215.0 413.6 L 213.5 413.7 L 210.8 415.0 L 209.0 414.8 L 207.5 415.3 L 208.3 418.6 L 207.0 419.4 L 205.9 421.0 L 206.0 422.3 L 204.7 424.6 L 203.0 425.6 L 205.8 427.5 L 208.5 431.2 L 208.5 432.8 L 205.5 435.8 L 204.6 441.5 L 207.2 444.2 L 207.6 446.4 L 208.7 447.0 L 209.1 449.0 L 210.9 451.3 L 216.1 454.2 L 218.7 456.5 L 219.9 460.5 L 223.7 464.7 L 223.9 465.8 L 226.7 465.6 L 227.3 466.4 L 228.8 465.7 L 228.5 464.6 L 231.4 457.2 L 234.0 454.9 L 232.9 452.9 L 232.1 452.5 L 232.0 450.2 L 233.5 448.4 L 235.0 447.6 L 235.2 446.0 L 236.8 446.1 L 237.5 445.3 L 238.4 445.1 L 241.6 446.9 L 243.7 450.8 L 249.2 456.8 L 250.4 455.8 L 252.9 455.8 L 256.2 454.5 L 257.9 452.2 L 260.1 454.1 L 262.0 455.1 L 264.0 455.0 L 265.0 456.1 L 266.4 454.7 L 269.8 453.0 L 271.8 452.8 L 273.8 450.0 L 275.0 450.3 L 275.6 449.9 L 277.1 450.8 L 277.8 450.5 L 279.9 447.4 L 288.2 441.7 L 289.9 439.1 L 291.9 439.8 L 295.4 443.9 L 298.0 446.0 L 299.3 445.1 L 301.1 445.3 L 303.4 444.2 Z",
            "cx": 255.7,
            "cy": 420.5
      },
      {
            "id": "bolivar",
            "name": "Bolívar",
            "provinceName": "Provincia Bolívar (Alta Puna)",
            "capital": "Bolívar",
            "regionId": "andina",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#155e75",
            "logoColorName": "Azul Cordillera",
            "gradient": "gradAndina",
            "aliases": [
                  "bolivar"
            ],
            "role": "Centinela de la Puna Andina, Crianza de Camélidos y Producción de Chuño",
            "distanceKm": 140,
            "travelTime": "4h desde Cochabamba Ciudad",
            "routeAccess": "Ruta hacia el sudoeste andino",
            "federation": "Central Seccional de Productores Originarios de Bolívar",
            "venueLocation": "Municipio de Bolívar",
            "altitudeMeters": 3750,
            "surfaceKm2": "413 km²",
            "climate": "Frío andino de puna brava",
            "keyProducts": [
                  "Quinua Real y Granos Andinos",
                  "Papa Amarga para Producción de Chuño y Tunta",
                  "Fibra Fina y Lana de Llama y Alpaca",
                  "Queso Criollo de Altura"
            ],
            "tourismAttractions": [
                  "Miradores de Alta Montaña a más de 4,000 msnm",
                  "Aguas Termales Medicinales de Chaqui Khocha",
                  "Santuario Patronal de San Bartolomé",
                  "Paisajes de Tholares y Pastoreo Altoandino"
            ],
            "highlight": "El municipio a mayor altitud de todo el departamento, testimonio de resiliencia cultural y producción de chuño de primera calidad.",
            "searchKeywords": "bolivar puna chuno tunta quinua llama alpaca fibra chaqui khocha frio andino",
            "path": "M 297.1 506.1 L 296.7 503.9 L 294.8 502.6 L 294.0 502.8 L 290.8 500.3 L 290.7 499.0 L 292.7 498.9 L 293.8 494.4 L 293.1 493.8 L 290.7 492.8 L 287.8 495.3 L 283.7 496.9 L 282.2 496.9 L 280.5 495.2 L 279.1 491.9 L 277.2 490.3 L 276.3 488.6 L 275.4 489.6 L 274.4 489.5 L 274.0 488.6 L 272.9 488.3 L 271.5 488.6 L 271.3 490.0 L 263.1 493.4 L 260.3 493.9 L 259.6 494.5 L 257.9 494.4 L 254.8 496.5 L 249.6 496.9 L 248.7 498.2 L 242.9 500.9 L 240.3 501.5 L 237.0 501.4 L 234.6 500.2 L 226.8 508.4 L 225.4 509.2 L 218.6 517.0 L 217.7 519.4 L 214.8 522.5 L 216.5 524.6 L 216.6 529.2 L 219.0 532.1 L 219.9 535.1 L 226.0 540.2 L 230.9 540.3 L 238.2 536.0 L 240.7 536.2 L 242.2 537.0 L 245.2 536.9 L 246.4 536.1 L 245.9 535.6 L 246.2 535.2 L 247.6 535.5 L 248.1 534.6 L 251.3 536.5 L 255.4 536.8 L 257.0 536.2 L 258.8 534.5 L 259.5 532.1 L 260.4 532.0 L 261.7 529.7 L 263.0 529.0 L 264.2 529.4 L 268.0 529.1 L 270.6 527.7 L 274.1 529.1 L 275.3 528.9 L 278.6 530.5 L 276.6 524.0 L 279.6 521.5 L 280.9 519.3 L 288.4 513.1 L 289.0 512.5 L 288.8 511.8 L 294.4 507.2 L 297.1 506.1 Z",
            "cx": 262.0,
            "cy": 513.3
      },
      {
            "id": "arque",
            "name": "Arque",
            "provinceName": "Provincia Arque",
            "capital": "Arque",
            "regionId": "andina",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#0369a1",
            "logoColorName": "Cian Andino",
            "gradient": "gradAndina",
            "aliases": [
                  "arque"
            ],
            "role": "Cuenca Minera de Altura, Aguas Termales y Cultivo Tradicional de Trigo",
            "distanceKm": 120,
            "travelTime": "3h 15min desde Cochabamba Ciudad",
            "routeAccess": "Línea férrea histórica y camino riberano del Río Arque",
            "federation": "Federación Regional Campesina de Arque",
            "venueLocation": "Pueblo de Arque",
            "altitudeMeters": 2700,
            "surfaceKm2": "1,077 km²",
            "climate": "Templado seco a frío en serranías",
            "keyProducts": [
                  "Trigo Criollo y Maíz de Quebrada",
                  "Papas Vallunas y Hortalizas",
                  "Minerales No Metálicos (Arcillas y Yeso)",
                  "Crianza de Ganado Caprino"
            ],
            "tourismAttractions": [
                  "Aguas Termales Curativas del Río Arque",
                  "Puentes Históricos de la Antigua Red Férrea",
                  "Serranías y Farallones Rocosos",
                  "Templo Colonial de Tacopaya"
            ],
            "highlight": "Territorio andino rico en fuentes termales minerales y de profunda vocación de cultivo de trigo tradicional.",
            "searchKeywords": "arque tacopaya rio arque termales ferrocarril trigo quebrada caprino andina",
            "path": "M 329.0 502.4 L 330.2 501.5 L 330.2 500.3 L 331.1 499.1 L 333.2 497.9 L 331.7 493.5 L 329.6 490.3 L 328.1 486.2 L 327.5 482.7 L 323.9 483.8 L 317.3 484.7 L 315.9 484.3 L 314.5 481.9 L 314.0 478.3 L 311.9 476.1 L 310.7 475.9 L 310.0 473.5 L 311.3 472.3 L 311.2 471.4 L 310.0 470.2 L 306.2 468.2 L 304.7 465.4 L 304.9 464.4 L 306.8 462.6 L 306.9 459.2 L 305.0 456.0 L 304.4 452.8 L 303.4 452.4 L 302.0 450.5 L 302.4 449.5 L 305.3 448.3 L 303.8 446.4 L 303.4 444.2 L 301.1 445.3 L 299.3 445.1 L 298.0 446.0 L 295.4 443.9 L 291.9 439.8 L 289.9 439.1 L 288.2 441.7 L 279.9 447.4 L 277.8 450.5 L 277.1 450.8 L 275.6 449.9 L 275.0 450.3 L 273.8 450.0 L 271.8 452.8 L 269.8 453.0 L 266.4 454.7 L 265.0 456.1 L 264.0 455.0 L 262.0 455.1 L 260.1 454.1 L 257.9 452.2 L 256.2 454.5 L 252.9 455.8 L 250.4 455.8 L 249.2 456.8 L 243.7 450.8 L 241.6 446.9 L 238.4 445.1 L 236.8 446.1 L 235.2 446.0 L 235.0 447.6 L 233.5 448.4 L 232.0 450.2 L 232.1 452.5 L 232.9 452.9 L 234.0 454.9 L 231.4 457.2 L 228.5 464.6 L 228.8 465.7 L 227.9 467.8 L 228.9 468.2 L 230.2 470.1 L 231.5 474.4 L 232.9 477.0 L 233.7 477.6 L 237.0 478.2 L 238.6 479.6 L 238.4 480.4 L 239.0 481.5 L 238.6 484.4 L 240.4 487.4 L 240.1 490.7 L 234.6 500.2 L 234.9 500.4 L 237.0 501.4 L 240.3 501.5 L 242.9 500.9 L 248.7 498.2 L 249.6 496.9 L 254.8 496.5 L 257.9 494.4 L 259.6 494.5 L 260.3 493.9 L 263.1 493.4 L 271.3 490.0 L 271.5 488.6 L 273.5 488.3 L 274.4 489.5 L 275.4 489.6 L 276.3 488.6 L 277.2 490.3 L 279.1 491.9 L 280.5 495.2 L 282.2 496.9 L 283.7 496.9 L 287.8 495.3 L 290.7 492.8 L 293.1 493.8 L 293.8 494.4 L 292.7 498.9 L 290.7 499.0 L 290.8 500.3 L 294.0 502.8 L 294.8 502.6 L 296.7 503.9 L 297.5 506.3 L 299.5 506.6 L 304.3 504.0 L 305.8 504.1 L 309.0 502.6 L 314.7 503.2 L 315.9 501.9 L 318.1 501.8 L 319.3 501.1 L 321.8 503.7 L 326.0 503.8 L 327.3 504.5 L 329.0 502.4 Z",
            "cx": 279.5,
            "cy": 475.8
      },
      {
            "id": "campero",
            "name": "Campero (Aiquile)",
            "provinceName": "Provincia Campero (Cono Sur)",
            "capital": "Aiquile",
            "regionId": "conosur",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#be185d",
            "logoColorName": "Magenta Cono Sur",
            "gradient": "gradConosur",
            "aliases": [
                  "campero",
                  "aiquile"
            ],
            "role": "Capital Internacional del Charango y Potencia Granífera del Cono Sur",
            "distanceKm": 220,
            "travelTime": "4h 30min desde Cochabamba Ciudad",
            "routeAccess": "Carretera de la Integración del Cono Sur asfaltada (Ruta 7)",
            "federation": "Federación Sindical Única de Campesinos de la Región Campero",
            "venueLocation": "Museo del Charango en Aiquile",
            "altitudeMeters": 2250,
            "surfaceKm2": "5,557 km²",
            "climate": "Templado seco con sol permanente",
            "keyProducts": [
                  "Charangos Artesanales de Concierto",
                  "Trigo, Maní y Maíz del Cono Sur",
                  "Queso de Cabra y Miel Silvestre",
                  "Uva de Altura y Frutas de Quebrada"
            ],
            "tourismAttractions": [
                  "Museo Internacional del Charango y Feria Nacional del Charango",
                  "Catedral San Pedro de Aiquile",
                  "Cañones y Valles de Omereque",
                  "Pinturas Rupestres de Quiroga"
            ],
            "highlight": "Declarada Capital Internacional del Charango por ley, cuna de los mejores lauderos y talladores de instrumentos del mundo.",
            "searchKeywords": "campero aiquile charango omereque quiroga trigo mani queso cabra cono sur musica",
            "path": "M 719.1 651.6 L 720.1 649.8 L 721.2 649.2 L 721.4 646.7 L 722.5 647.6 L 723.0 647.4 L 722.0 645.8 L 722.0 643.3 L 723.9 642.8 L 724.2 641.2 L 725.4 641.2 L 725.9 640.2 L 726.4 641.1 L 727.0 641.0 L 727.3 639.4 L 729.0 637.4 L 728.7 636.7 L 728.1 636.7 L 727.9 635.6 L 726.7 635.0 L 727.6 632.4 L 727.3 631.5 L 725.6 630.4 L 726.4 629.2 L 725.3 629.1 L 726.7 627.6 L 727.4 628.5 L 728.1 628.1 L 726.8 626.0 L 727.4 625.3 L 727.1 624.4 L 726.5 623.8 L 724.9 623.8 L 725.4 620.8 L 724.1 620.6 L 723.8 617.7 L 724.4 617.2 L 724.2 616.2 L 723.6 615.6 L 723.1 616.2 L 721.4 615.7 L 720.3 616.5 L 719.4 614.5 L 717.9 613.6 L 717.9 611.7 L 715.0 611.5 L 713.5 610.1 L 712.5 610.4 L 712.0 609.1 L 711.1 609.2 L 708.7 607.8 L 708.3 606.9 L 706.7 606.3 L 704.4 606.4 L 699.4 599.6 L 699.4 597.6 L 698.0 595.8 L 699.0 594.5 L 699.0 590.8 L 696.9 589.2 L 695.7 590.5 L 695.2 590.2 L 695.8 588.7 L 696.9 588.3 L 696.9 587.1 L 695.8 586.5 L 696.7 585.8 L 698.2 582.4 L 695.7 580.0 L 694.6 580.5 L 694.4 579.6 L 693.1 579.9 L 692.7 578.8 L 692.4 579.9 L 690.6 577.3 L 691.6 576.8 L 692.1 575.7 L 690.5 575.5 L 690.3 573.8 L 687.9 573.6 L 688.8 570.4 L 688.4 568.8 L 687.1 569.1 L 687.0 568.6 L 687.8 568.1 L 688.5 566.5 L 687.8 566.5 L 687.1 565.4 L 686.8 562.2 L 686.0 561.5 L 686.4 560.9 L 685.4 561.2 L 684.9 560.5 L 685.4 559.2 L 684.4 558.3 L 685.5 556.5 L 684.1 554.8 L 683.0 554.3 L 682.8 553.4 L 682.0 553.5 L 683.2 551.3 L 680.3 549.8 L 680.9 547.8 L 679.5 546.3 L 680.4 545.4 L 679.0 545.3 L 679.3 544.7 L 678.9 544.3 L 677.3 543.8 L 677.2 542.3 L 675.7 540.2 L 674.4 540.0 L 673.1 539.0 L 672.8 537.9 L 670.2 537.1 L 669.0 535.8 L 665.5 534.5 L 663.9 534.6 L 663.3 533.5 L 662.7 533.5 L 662.4 531.7 L 661.6 531.3 L 661.0 531.9 L 660.1 531.5 L 659.5 532.0 L 657.8 531.8 L 655.9 533.3 L 653.8 532.8 L 652.4 533.6 L 651.4 533.6 L 650.8 532.8 L 648.6 533.0 L 648.2 532.4 L 646.3 532.4 L 646.0 531.4 L 642.7 528.8 L 642.5 527.1 L 641.5 526.8 L 641.8 525.5 L 640.8 524.6 L 641.6 523.6 L 641.4 520.7 L 640.6 520.9 L 637.9 519.7 L 637.3 520.0 L 635.7 518.2 L 634.6 515.2 L 631.6 511.2 L 631.4 508.5 L 623.2 508.9 L 620.2 507.5 L 612.9 508.3 L 607.1 508.0 L 605.6 505.3 L 606.4 503.8 L 600.6 495.5 L 598.1 489.6 L 589.3 485.1 L 586.8 488.7 L 583.5 491.7 L 583.7 493.0 L 582.1 494.0 L 581.8 496.8 L 580.3 497.5 L 581.3 501.2 L 581.0 503.5 L 581.5 505.0 L 583.3 506.9 L 581.2 510.3 L 579.3 511.8 L 579.8 512.7 L 580.6 512.8 L 580.5 514.2 L 581.7 517.3 L 580.9 517.5 L 580.4 518.6 L 578.4 519.0 L 578.8 519.6 L 578.5 520.5 L 577.9 520.4 L 576.5 518.5 L 575.1 518.9 L 572.8 518.5 L 572.3 516.9 L 571.5 516.3 L 570.9 517.0 L 571.6 517.5 L 570.9 518.1 L 571.0 518.7 L 570.5 518.7 L 569.6 517.6 L 568.2 517.1 L 566.0 514.2 L 561.2 513.3 L 561.6 512.3 L 561.1 511.9 L 557.6 510.9 L 557.3 508.0 L 554.8 506.6 L 553.4 504.1 L 551.0 503.8 L 550.2 502.2 L 549.0 502.4 L 548.3 501.4 L 547.9 502.1 L 546.9 501.1 L 545.7 500.9 L 544.8 499.8 L 545.3 498.7 L 544.5 497.4 L 543.8 497.2 L 543.0 497.7 L 543.4 498.3 L 542.8 498.4 L 541.8 496.6 L 540.6 496.6 L 541.0 495.7 L 539.3 496.8 L 537.7 499.0 L 537.4 500.4 L 536.3 501.3 L 537.3 502.5 L 539.1 503.0 L 539.4 506.7 L 535.5 506.3 L 532.7 507.4 L 534.1 511.8 L 532.2 515.5 L 532.8 517.3 L 534.0 516.7 L 535.3 517.4 L 536.6 519.1 L 536.7 520.9 L 537.4 522.1 L 538.5 522.3 L 538.7 523.3 L 537.9 524.6 L 539.4 527.4 L 540.1 530.3 L 536.6 530.9 L 533.3 530.5 L 532.0 531.2 L 531.1 535.3 L 531.2 537.2 L 529.4 537.5 L 528.0 536.7 L 526.5 537.1 L 524.7 538.4 L 524.8 539.8 L 523.2 542.0 L 525.8 547.0 L 525.5 549.2 L 522.9 550.0 L 523.5 551.2 L 522.7 552.2 L 522.4 554.4 L 524.5 557.8 L 523.6 562.1 L 522.9 564.1 L 519.2 563.7 L 518.3 564.6 L 518.5 565.9 L 517.7 566.3 L 516.7 568.9 L 519.7 571.0 L 519.6 572.3 L 521.3 574.4 L 521.8 582.4 L 519.6 582.3 L 518.6 583.5 L 518.5 585.1 L 516.3 587.8 L 516.3 592.5 L 515.6 592.9 L 515.0 595.2 L 513.2 596.9 L 514.3 597.8 L 515.1 599.5 L 518.1 601.2 L 517.4 602.6 L 517.1 605.6 L 517.2 606.9 L 518.1 608.1 L 519.1 608.1 L 521.7 604.7 L 524.8 607.5 L 526.3 610.6 L 525.6 613.8 L 525.9 615.3 L 526.7 615.8 L 526.7 617.1 L 527.6 617.4 L 528.6 618.7 L 533.3 617.6 L 535.1 618.0 L 534.9 620.9 L 535.6 622.3 L 535.3 624.1 L 536.7 628.1 L 535.1 633.9 L 535.3 637.2 L 534.7 637.9 L 535.7 640.2 L 537.8 640.6 L 541.2 640.1 L 542.2 640.6 L 543.3 642.8 L 543.8 642.9 L 547.8 641.4 L 549.3 641.7 L 551.5 639.9 L 553.2 640.7 L 555.0 639.1 L 555.1 641.1 L 559.0 643.3 L 559.9 644.8 L 561.5 644.7 L 564.1 646.4 L 565.2 649.8 L 566.4 649.9 L 567.2 650.7 L 569.0 650.2 L 572.7 653.7 L 574.3 653.4 L 575.9 655.0 L 578.1 652.1 L 577.3 651.0 L 576.7 648.1 L 575.6 648.7 L 574.8 647.6 L 574.8 645.0 L 574.1 644.1 L 575.4 643.0 L 574.9 640.6 L 576.6 639.8 L 576.9 638.0 L 577.7 637.4 L 580.2 637.5 L 580.2 634.7 L 581.7 632.9 L 583.7 631.8 L 584.4 630.5 L 584.4 629.1 L 585.6 628.9 L 586.5 629.7 L 592.7 628.0 L 593.1 627.3 L 592.6 625.8 L 597.3 623.1 L 598.0 620.6 L 601.9 618.9 L 602.8 617.7 L 606.1 616.8 L 609.7 614.3 L 610.3 615.2 L 611.4 614.9 L 612.1 615.4 L 613.1 613.9 L 614.3 614.5 L 617.0 613.4 L 618.6 614.7 L 623.4 614.4 L 624.9 615.5 L 625.2 617.3 L 627.6 620.4 L 627.1 621.2 L 627.8 622.3 L 631.5 622.7 L 637.6 624.7 L 639.4 623.9 L 640.2 624.6 L 642.3 624.1 L 643.4 625.1 L 644.1 624.8 L 644.5 623.2 L 645.4 623.0 L 645.9 624.9 L 648.1 625.4 L 650.6 630.8 L 654.2 632.0 L 656.2 635.8 L 655.1 636.7 L 655.2 638.2 L 656.1 638.8 L 657.6 638.8 L 658.0 641.5 L 659.9 642.6 L 660.4 644.7 L 663.4 647.0 L 665.4 646.9 L 667.9 649.0 L 670.3 649.3 L 672.1 650.9 L 673.2 653.5 L 681.1 653.8 L 682.6 652.0 L 684.8 652.8 L 690.9 652.2 L 693.5 649.2 L 695.7 649.0 L 696.8 648.3 L 697.2 646.5 L 698.6 644.2 L 700.1 643.6 L 701.5 643.9 L 705.4 642.3 L 707.8 643.0 L 708.8 642.5 L 710.8 642.7 L 711.8 642.2 L 712.5 641.0 L 713.3 646.0 L 715.9 651.0 L 716.8 652.0 L 719.1 651.6 Z",
            "cx": 619.1,
            "cy": 580.4
      },
      {
            "id": "mizque",
            "name": "Mizque",
            "provinceName": "Provincia Mizque",
            "capital": "Mizque",
            "regionId": "conosur",
            "isVenue": false,
            "isTropico": false,
            "logoColor": "#9d174d",
            "logoColorName": "Rubí Cono Sur",
            "gradient": "gradConosur",
            "aliases": [
                  "mizque"
            ],
            "role": "Ciudad de los Mil Reyes, Huertos Frutales, Cebolla de Exportación y Vino",
            "distanceKm": 160,
            "travelTime": "3h 40min desde Cochabamba Ciudad",
            "routeAccess": "Carretera hacia Arani - Mizque asfaltada",
            "federation": "Central Provincial Campesina de Mizque",
            "venueLocation": "Valle Central de Mizque",
            "altitudeMeters": 2020,
            "surfaceKm2": "2,730 km²",
            "climate": "Templado cálido de valle protegido",
            "keyProducts": [
                  "Cebolla Roja y Blanca de Reconocimiento Nacional",
                  "Maní y Sandía de Riego",
                  "Uva de Quebrada y Vinos Artesanales",
                  "Producción Apícola y Cítricos"
            ],
            "tourismAttractions": [
                  "Puente Colonial del Río Kuri",
                  "Templo y Museo Arqueológico Colonial de Mizque",
                  "Festividad Patronal del Señor de Burgos",
                  "Valle Frutícola de San Vicente"
            ],
            "highlight": "Histórica Ciudad de los Mil Reyes, renombrada por sus huertos feraces y la afamada cebolla mizqueña.",
            "searchKeywords": "mizque cebolla mani frutas vino uva señor de burgos kuri cono sur mil reyes",
            "path": "M 437.1 443.0 L 436.0 444.3 L 434.3 449.3 L 439.4 452.4 L 439.9 455.2 L 441.3 456.1 L 442.5 458.0 L 441.3 462.2 L 439.7 464.4 L 439.2 469.8 L 439.5 475.1 L 441.7 476.4 L 442.0 477.9 L 441.2 478.8 L 440.9 478.4 L 439.2 478.8 L 435.7 480.7 L 435.9 482.5 L 434.6 484.4 L 430.5 483.2 L 429.4 482.1 L 428.6 482.3 L 426.4 479.5 L 426.0 482.5 L 425.3 482.7 L 424.0 481.7 L 422.7 483.6 L 423.2 487.5 L 424.3 489.4 L 425.8 490.6 L 425.0 492.3 L 423.3 493.3 L 422.0 496.6 L 421.4 496.6 L 421.2 497.2 L 423.1 498.2 L 424.3 500.0 L 425.5 500.4 L 426.1 502.1 L 427.6 502.2 L 427.9 503.3 L 429.2 503.7 L 429.8 506.0 L 429.5 508.9 L 427.7 509.5 L 425.7 511.9 L 424.2 512.5 L 423.8 513.7 L 424.2 514.4 L 425.9 514.7 L 426.5 515.9 L 427.5 516.2 L 427.2 518.4 L 429.4 519.5 L 430.3 519.3 L 431.0 520.4 L 432.7 520.8 L 433.7 522.0 L 435.1 522.1 L 435.7 524.1 L 438.0 524.4 L 438.3 525.9 L 442.0 528.0 L 443.0 530.3 L 446.3 532.5 L 447.9 536.3 L 448.8 537.0 L 449.6 536.8 L 450.2 538.1 L 453.1 539.7 L 454.0 541.0 L 456.2 540.4 L 456.1 541.6 L 457.3 542.4 L 457.5 543.6 L 459.5 544.7 L 461.4 547.3 L 463.1 548.5 L 464.6 554.4 L 465.5 555.2 L 467.1 555.3 L 467.2 556.7 L 469.8 558.5 L 471.1 560.9 L 473.2 561.8 L 474.0 561.5 L 475.2 563.5 L 476.3 563.2 L 476.9 563.6 L 477.3 562.6 L 478.8 563.4 L 479.5 564.9 L 481.1 564.7 L 483.7 565.8 L 483.8 568.2 L 485.4 570.0 L 486.4 573.0 L 487.2 573.9 L 488.4 573.3 L 488.7 573.6 L 488.2 575.1 L 489.5 575.6 L 489.0 577.6 L 489.8 580.1 L 491.4 581.9 L 491.4 583.4 L 494.9 587.0 L 495.9 587.4 L 496.4 588.6 L 498.3 589.2 L 499.7 587.9 L 500.7 587.9 L 503.1 588.8 L 509.4 594.5 L 513.5 597.0 L 515.0 595.2 L 515.6 592.9 L 516.3 592.5 L 516.3 587.8 L 518.5 585.1 L 518.6 583.5 L 519.6 582.3 L 521.8 582.4 L 521.3 574.4 L 519.6 572.3 L 519.7 571.0 L 516.7 568.9 L 517.7 566.3 L 518.5 565.9 L 518.3 564.6 L 519.2 563.7 L 522.9 564.1 L 523.6 562.1 L 524.5 557.8 L 522.4 554.4 L 522.7 552.2 L 523.5 551.2 L 522.9 550.0 L 525.5 549.2 L 525.8 547.0 L 523.2 542.0 L 524.8 539.8 L 524.7 538.4 L 526.5 537.1 L 528.0 536.7 L 529.4 537.5 L 531.2 537.2 L 531.1 535.3 L 532.0 531.2 L 533.3 530.5 L 536.6 530.9 L 540.1 530.3 L 539.4 527.4 L 537.9 524.6 L 538.7 523.3 L 538.5 522.3 L 537.4 522.1 L 536.7 520.9 L 536.6 519.1 L 535.3 517.4 L 534.0 516.7 L 532.8 517.3 L 532.2 515.5 L 534.1 511.8 L 532.7 507.4 L 535.5 506.3 L 539.4 506.7 L 539.1 503.0 L 537.3 502.5 L 536.3 501.3 L 537.4 500.4 L 537.7 499.0 L 539.3 496.8 L 541.0 495.5 L 537.7 494.7 L 537.2 492.9 L 534.8 490.3 L 531.4 489.4 L 527.6 484.4 L 526.5 484.0 L 526.4 482.6 L 525.3 482.0 L 521.8 474.9 L 522.0 472.4 L 522.8 471.3 L 520.3 467.3 L 516.1 466.2 L 512.7 466.0 L 511.2 467.8 L 507.8 467.5 L 506.1 465.9 L 502.2 466.6 L 500.1 465.3 L 498.5 464.9 L 496.0 465.2 L 494.9 464.4 L 492.9 464.2 L 492.2 464.7 L 489.3 463.2 L 487.3 463.7 L 486.1 465.2 L 484.7 464.2 L 483.4 460.0 L 479.1 456.7 L 476.1 452.8 L 474.2 451.7 L 473.6 450.4 L 468.5 447.6 L 466.7 445.9 L 459.3 443.1 L 456.3 440.7 L 451.7 438.5 L 448.7 442.3 L 444.7 443.2 L 443.3 445.0 L 442.4 445.2 L 440.0 444.0 L 438.1 444.0 L 437.1 443.0 Z",
            "cx": 480.3,
            "cy": 516.4
      }
],
    "travelTips": [
      {
        "title": "Transporte Terrestre en 'Surubíes' (Vans Rápidas)",
        "desc": "Servicio expreso directo desde Sacaba (Avenida Barrientos) hasta Villa Tunari cada 15 minutos. Tiempo aproximado: 3h a 3h 30min."
      },
      {
        "title": "Flotas Interdepartamentales",
        "desc": "Salen continuamente desde la Terminal Central de Cochabamba con destino a Santa Cruz por la Carretera Nueva. Parada directa en el Recinto Ferial San Mateo de Villa Tunari."
      },
      {
        "title": "Vuelos Charter y Aeropuerto de Chimoré",
        "desc": "El Aeropuerto Internacional Soberanía de Chimoré habilitará frecuencias especiales y vuelos ejecutivos durante las fechas de FITROP 2026 (2, 3 y 4 de Octubre)."
      },
      {
        "title": "Recomendaciones de Viaje",
        "desc": "Ruta 100% asfaltada. Llevar ropa cómoda y ligera, protector solar, impermeable para posibles lloviznas tropicales y documento de identidad vigente."
      }
    ]
  }
};


fitropData.federacionesData = [
  {
    "id": "fed-tropico",
    "name": "Fed. Especial de Trabajadores Campesinos del Trópico",
    "municipality": "Villa Tunari",
    "color": "#059669",
    "badge": "Piscicultura • Frutas • Ecoturismo",
    "description": "Es un núcleo clave en la producción de coca y el secado de la hoja. Al mismo tiempo, lidera la producción de frutas tropicales (como cítricos y papaya) y ha desarrollado con fuerza el sector de la piscicultura (crianza de tambaquí y pacú) y el turismo comunitario. Es el núcleo principal de los pescados en el trópico mediante la construcción de pozas piscícolas familiares y comunitarias.",
    "crops": [
      "Piscicultura (Tambaquí y Pacú)",
      "Pozas Piscícolas Familiares y Comunitarias",
      "Cítricos y Papaya",
      "Turismo Comunitario",
      "Hoja de Coca Tradicional"
    ],
    "previewCategories": [
      "piscicultura",
      "frutas"
    ]
  },
  {
    "id": "fed-chimore",
    "name": "Fed. Especial de Colonizadores de Chimoré",
    "municipality": "Chimoré (Oficina Principal y Logística)",
    "color": "#f97316",
    "badge": "Piña de Exportación • Palmito • Lácteos",
    "description": "Destaca por la producción masiva de piña de exportación y banano. Alberga importantes plantas procesadoras de lácteos y centros de acopio piscícolas que dan soporte técnico a sus afiliados. Es una de las zonas clave del palmito, ya que alberga plantas procesadoras estatales y privadas que recolectan los cogollos locales para envasado.",
    "crops": [
      "Piña de Exportación Masiva",
      "Palmito en Conserva",
      "Plantas Procesadoras de Lácteos",
      "Centros de Acopio Piscícola",
      "Banano de Altura"
    ],
    "previewCategories": [
      "pina",
      "palmito",
      "banana"
    ]
  },
  {
    "id": "fed-carrasco",
    "name": "Fed. Especial de Colonizadores de Carrasco Tropical",
    "municipality": "Puerto Villarroel (Eje Fluvial y Comercial)",
    "color": "#10b981",
    "badge": "Banano de Exportación • Cacao • Café",
    "description": "Es una potencia en la producción de banano de exportación (enviado principalmente a mercados como Argentina y Chile) y cultivos alternativos como el cacao y el café robusta. Funciona también como área complementaria de recolección de palmito.",
    "crops": [
      "Banano de Exportación (Argentina y Chile)",
      "Cacao Amazónico y Derivados",
      "Café Robusta",
      "Recolección Complementaria de Palmito",
      "Comercio Fluvial y Portuario"
    ],
    "previewCategories": [
      "banana",
      "cacao",
      "palmito"
    ]
  },
  {
    "id": "fed-centrales-unidas",
    "name": "Fed. Única de Centrales Unidas",
    "municipality": "Shinahota (Corazón Frutícola y Palmitero)",
    "color": "#eab308",
    "badge": "Palmito Masivo • Horticultura • Ganadería",
    "description": "Concentra gran parte de la producción hortícola y frutícola de la zona central, además de la siembra regulada de coca. Ha incursionado fuertemente en proyectos ganaderos y de apoyo a pequeños productores agrícolas. Es el epicentro de la cosecha masiva de los cogollos de palmito.",
    "crops": [
      "Cosecha Masiva de Cogollos de Palmito",
      "Horticultura de Zona Central",
      "Fruticultura Tropical",
      "Proyectos Ganaderos Familiares",
      "Siembra Regulada de Coca"
    ],
    "previewCategories": [
      "palmito",
      "frutas"
    ]
  },
  {
    "id": "fed-yungas-chapare",
    "name": "Fed. Especial de Yungas de Chapare",
    "municipality": "Chapare (Transición Montañosa y Selva Húmeda)",
    "color": "#047857",
    "badge": "Miel Pura de Bosque • Cítricos de Ladera",
    "description": "Debido a su geografía de transición montañosa, se especializa en el cultivo tradicional de la hoja de coca, producción de miel y cítricos en zonas de ladera. Por su geografía de monte denso, es la zona principal del trópico para la producción y extracción de miel pura de bosque.",
    "crops": [
      "Miel Pura de Monte y Bosque Denso",
      "Apicultura Silvestre en Ladera",
      "Cítricos de Altura",
      "Cultivo Tradicional de Coca"
    ],
    "previewCategories": [
      "miel",
      "frutas"
    ]
  },
  {
    "id": "fed-mamore-bulo-bulo",
    "name": "Fed. Agraria Mamoré Bulo Bulo",
    "municipality": "Entre Ríos / Bulo Bulo (Polo Agropecuario y Energético)",
    "color": "#ef4444",
    "badge": "Ganadería Bovina • Arroz • Maíz • Yuca",
    "description": "Ubicada en una llanura muy fértil, lidera la producción ganadera (bovina) de la región, además de grandes extensiones de cultivos de arroz, maíz y yuca.",
    "crops": [
      "Ganadería Bovina en Llanura Fértil",
      "Arroz Tropical de Alta Densidad",
      "Maíz Amarillo y Choclo",
      "Yuca de Mesa e Industrial",
      "Complejo Petroquímico y Bioceánico"
    ],
    "previewCategories": [
      "frutas",
      "dirigentes"
    ]
  }
];
fitropData.mancomunidadData = {
  "name": "Mancomunidad de Municipios del Trópico de Cochabamba",
  "subtitle": "Articulación Estatal y Gobernanza Territorial de los 5 Municipios",
  "description": "Entidad pública articuladora de los cinco gobiernos autónomos municipales: Villa Tunari, Shinahota, Chimoré, Puerto Villarroel y Entre Ríos. Coordina la infraestructura vial, provisión de servicios básicos, recintos feriales y fiscalización fitozoosanitaria.",
  "municipios": [
    "Villa Tunari",
    "Shinahota",
    "Chimoré",
    "Puerto Villarroel",
    "Entre Ríos"
  ],
  "logo": "assets/img/LOGO MANCOMUNIDAD DE LOS MUNICIPIOS 3_ (1).png"
};
fitropData.produccionGallery = [
  {
    "id": "banana_1",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Racimos de Banano Cosechados en Chaco",
    "file": "assets/img/produccion/banana/banana_01.jpg",
    "size": 112080
  },
  {
    "id": "banana_2",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Banano de Exportación Seleccionado",
    "file": "assets/img/produccion/banana/banana_02.jpg",
    "size": 41562
  },
  {
    "id": "banana_3",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Transporte de Cajas de Banano para Argentina y Chile",
    "file": "assets/img/produccion/banana/banana_03.jpg",
    "size": 99617
  },
  {
    "id": "banana_4",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Control de Calidad y Clasificación de Fruta",
    "file": "assets/img/produccion/banana/banana_04.jpg",
    "size": 66433
  },
  {
    "id": "banana_5",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Línea de Lavado y Desinfección en Planta Empacadora",
    "file": "assets/img/produccion/banana/banana_05.jpg",
    "size": 67471
  },
  {
    "id": "banana_6",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Limpieza Técnica de Banano de Calidad",
    "file": "assets/img/produccion/banana/banana_06.jpg",
    "size": 58277
  },
  {
    "id": "banana_7",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Empaque y Sellado de Cajas de Exportación",
    "file": "assets/img/produccion/banana/banana_07.jpg",
    "size": 133459
  },
  {
    "id": "banana_8",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Plantaciones Extensivas de Banano en Carrasco Tropical",
    "file": "assets/img/produccion/banana/banana_08.jpg",
    "size": 87246
  },
  {
    "id": "banana_9",
    "category": "banana",
    "categoryTitle": "Banano y Plátano de Exportación",
    "title": "Cosecha Manual de Racimos en Plantación",
    "file": "assets/img/produccion/banana/banana_09.jpg",
    "size": 102271
  },
  {
    "id": "cacao_1",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Cacao Amazónico Cosechado en Cesta Tradicional",
    "file": "assets/img/produccion/cacao/cacao_01.jpeg",
    "size": 157191
  },
  {
    "id": "cacao_2",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Secado Solar de Grano de Cacao en Tendales Elevados",
    "file": "assets/img/produccion/cacao/cacao_02.jpeg",
    "size": 256541
  },
  {
    "id": "cacao_3",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Fruto del Cacao en Sección Transversal con Grano",
    "file": "assets/img/produccion/cacao/cacao_03.jpeg",
    "size": 221474
  },
  {
    "id": "cacao_4",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Invernadero y Vivero de Germinación de Cacao",
    "file": "assets/img/produccion/cacao/cacao_04.jpeg",
    "size": 238487
  },
  {
    "id": "cacao_5",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Remoción y Fermentación Técnica de Granos",
    "file": "assets/img/produccion/cacao/cacao_05.jpeg",
    "size": 134954
  },
  {
    "id": "cacao_6",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Acopio de Cajas de Cacao en Grano",
    "file": "assets/img/produccion/cacao/cacao_06.jpeg",
    "size": 178875
  },
  {
    "id": "cacao_7",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Área de Maduración y Fermentación Controlada",
    "file": "assets/img/produccion/cacao/cacao_07.jpeg",
    "size": 316614
  },
  {
    "id": "cacao_8",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Muestra de Mazorca de Cacao de Calidad Superior",
    "file": "assets/img/produccion/cacao/cacao_08.jpeg",
    "size": 108282
  },
  {
    "id": "cacao_9",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Mazorca Madura de Cacao Amazónico en Primer Plano",
    "file": "assets/img/produccion/cacao/cacao_09.jpeg",
    "size": 86172
  },
  {
    "id": "cacao_10",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Plantación Agroforestal de Cacao en Puerto Villarroel",
    "file": "assets/img/produccion/cacao/cacao_10.jpeg",
    "size": 201906
  },
  {
    "id": "cacao_11",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Cultivo Extensivo de Cacao Asociado a Monte",
    "file": "assets/img/produccion/cacao/cacao_11.jpeg",
    "size": 287664
  },
  {
    "id": "cacao_12",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Plantines de Cacao en Fase de Vivero",
    "file": "assets/img/produccion/cacao/cacao_12.jpeg",
    "size": 359668
  },
  {
    "id": "cacao_13",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Productora Mostrando Semillas de Cacao Fermentadas",
    "file": "assets/img/produccion/cacao/cacao_13.jpeg",
    "size": 107046
  },
  {
    "id": "cacao_14",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Plantas Jóvenes Listas para Siembra en Chaco",
    "file": "assets/img/produccion/cacao/cacao_14.jpeg",
    "size": 195896
  },
  {
    "id": "cacao_15",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Brote y Germinación de Semillas de Cacao",
    "file": "assets/img/produccion/cacao/cacao_15.jpeg",
    "size": 282728
  },
  {
    "id": "cacao_16",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Manejo Agroforestal del Suelo y Planta de Cacao",
    "file": "assets/img/produccion/cacao/cacao_16.jpeg",
    "size": 166897
  },
  {
    "id": "cacao_17",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Derivados de Cacao: Chocolates y Manteca Amazónica",
    "file": "assets/img/produccion/cacao/cacao_17.jpeg",
    "size": 119427
  },
  {
    "id": "cacao_18",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Productor con Plantas de Cacao Seleccionadas",
    "file": "assets/img/produccion/cacao/cacao_18.jpeg",
    "size": 305759
  },
  {
    "id": "cacao_19",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Productora Campesina en Vivero Comunitario",
    "file": "assets/img/produccion/cacao/cacao_19.jpeg",
    "size": 135556
  },
  {
    "id": "cacao_20",
    "category": "cacao",
    "categoryTitle": "Cacao Silvestre y Derivados",
    "title": "Siembra y Cuidado de Cacao Agroforestal",
    "file": "assets/img/produccion/cacao/cacao_20.jpeg",
    "size": 140249
  },
  {
    "id": "frutas_1",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Cosecha de Cítricos y Naranjas Seleccionadas",
    "file": "assets/img/produccion/frutas/frutas_01.jpeg",
    "size": 223825
  },
  {
    "id": "frutas_2",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Producción de Papaya Tropical en Chacos Campesinos",
    "file": "assets/img/produccion/frutas/frutas_02.jpeg",
    "size": 89440
  },
  {
    "id": "frutas_3",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Muestra de Mandarinas y Frutas de Valle Tropical",
    "file": "assets/img/produccion/frutas/frutas_03.jpeg",
    "size": 93243
  },
  {
    "id": "frutas_4",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Huertos Frutícolas de Shinahota y Villa Tunari",
    "file": "assets/img/produccion/frutas/frutas_04.jpeg",
    "size": 82151
  },
  {
    "id": "frutas_5",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Fruticultura Diversificada para Mercados Nacionales",
    "file": "assets/img/produccion/frutas/frutas_05.jpeg",
    "size": 145340
  },
  {
    "id": "frutas_6",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Cítricos de Altura y Frutas Silvestres del Trópico",
    "file": "assets/img/produccion/frutas/frutas_06.jpeg",
    "size": 288927
  },
  {
    "id": "frutas_7",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Cosecha Familiar de Frutos Tropicales",
    "file": "assets/img/produccion/frutas/frutas_07.jpeg",
    "size": 180351
  },
  {
    "id": "frutas_8",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Fruta Fresca Seleccionada para Distribución",
    "file": "assets/img/produccion/frutas/frutas_08.jpeg",
    "size": 307765
  },
  {
    "id": "frutas_9",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Muestra de Cítricos Agroecológicos",
    "file": "assets/img/produccion/frutas/frutas_09.jpeg",
    "size": 184362
  },
  {
    "id": "frutas_10",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Producción Frutícola de las Seis Federaciones",
    "file": "assets/img/produccion/frutas/frutas_10.jpeg",
    "size": 167423
  },
  {
    "id": "frutas_11",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Canastas de Cítricos y Frutas Tropicales de Temporada",
    "file": "assets/img/produccion/frutas/frutas_11.jpeg",
    "size": 311814
  },
  {
    "id": "frutas_12",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Cítricos Dulces de Chaco Campesino",
    "file": "assets/img/produccion/frutas/frutas_12.jpeg",
    "size": 340007
  },
  {
    "id": "frutas_13",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Fruticultura Tropical en Terreno Fértil",
    "file": "assets/img/produccion/frutas/frutas_13.jpeg",
    "size": 82458
  },
  {
    "id": "frutas_14",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Exhibición Agroecológica de Frutas del Trópico",
    "file": "assets/img/produccion/frutas/frutas_14.jpeg",
    "size": 66747
  },
  {
    "id": "frutas_15",
    "category": "frutas",
    "categoryTitle": "Frutas Tropicales y Cítricos",
    "title": "Cosecha Campesina de Fruta Tropical de Exportación",
    "file": "assets/img/produccion/frutas/frutas_15.jpeg",
    "size": 431647
  },
  {
    "id": "miel_1",
    "category": "miel",
    "categoryTitle": "Miel Pura de Bosque Nativo",
    "title": "Apicultores en Manejo Técnico con Traje de Protección",
    "file": "assets/img/produccion/miel/miel_01.jpg",
    "size": 41517
  },
  {
    "id": "miel_2",
    "category": "miel",
    "categoryTitle": "Miel Pura de Bosque Nativo",
    "title": "Cajas Apícolas en Pleno Bosque Tropical Húmedo",
    "file": "assets/img/produccion/miel/miel_02.webp",
    "size": 249928
  },
  {
    "id": "miel_3",
    "category": "miel",
    "categoryTitle": "Miel Pura de Bosque Nativo",
    "title": "Planta de Procesamiento y Envasado de Miel de Monte",
    "file": "assets/img/produccion/miel/miel_03.jpg",
    "size": 63985
  },
  {
    "id": "miel_4",
    "category": "miel",
    "categoryTitle": "Miel Pura de Bosque Nativo",
    "title": "Presentación de Miel Pura de Bosque Envasada",
    "file": "assets/img/produccion/miel/miel_04.jpg",
    "size": 43553
  },
  {
    "id": "miel_5",
    "category": "miel",
    "categoryTitle": "Miel Pura de Bosque Nativo",
    "title": "Trabajo de Campo en Apiarios de Ladera",
    "file": "assets/img/produccion/miel/miel_05.jpg",
    "size": 64223
  },
  {
    "id": "miel_6",
    "category": "miel",
    "categoryTitle": "Miel Pura de Bosque Nativo",
    "title": "Bastidores de Colmena con Miel Pura de Monte",
    "file": "assets/img/produccion/miel/miel_06.jpg",
    "size": 274859
  },
  {
    "id": "miel_7",
    "category": "miel",
    "categoryTitle": "Miel Pura de Bosque Nativo",
    "title": "Producción Apícola Pura de Yungas de Chapare",
    "file": "assets/img/produccion/miel/miel_07.jpeg",
    "size": 161659
  },
  {
    "id": "palmito_1",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Plantación Extensiva de Palmito en Shinahota",
    "file": "assets/img/produccion/palmito/palmito_01.webp",
    "size": 1171038
  },
  {
    "id": "palmito_2",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Control de Calidad de Palmito en Conserva",
    "file": "assets/img/produccion/palmito/palmito_02.webp",
    "size": 40262
  },
  {
    "id": "palmito_3",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Cosecha Manual de Cogollos con Machete",
    "file": "assets/img/produccion/palmito/palmito_03.jpg",
    "size": 84343
  },
  {
    "id": "palmito_4",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Manejo Técnico de la Planta de Palmito",
    "file": "assets/img/produccion/palmito/palmito_04.jpg",
    "size": 82804
  },
  {
    "id": "palmito_5",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Línea de Procesamiento y Clasificación de Cogollos",
    "file": "assets/img/produccion/palmito/palmito_05.jpg",
    "size": 43491
  },
  {
    "id": "palmito_6",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Personal Técnico en Planta Envasadora de Palmito",
    "file": "assets/img/produccion/palmito/palmito_06.jpg",
    "size": 40022
  },
  {
    "id": "palmito_7",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Palmito en Conserva en Presentación Comercial",
    "file": "assets/img/produccion/palmito/palmito_07.webp",
    "size": 30830
  },
  {
    "id": "palmito_8",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Corte de Medallones de Palmito Tierno",
    "file": "assets/img/produccion/palmito/palmito_08.jpg",
    "size": 37166
  },
  {
    "id": "palmito_9",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Palmito Envasado con Sello de Calidad del Trópico",
    "file": "assets/img/produccion/palmito/palmito_09.webp",
    "size": 14656
  },
  {
    "id": "palmito_10",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Cogollos de Palmito Recién Cosechados",
    "file": "assets/img/produccion/palmito/palmito_10.jpg",
    "size": 53219
  },
  {
    "id": "palmito_11",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Rodajas de Palmito Preparadas para Envasado",
    "file": "assets/img/produccion/palmito/palmito_11.jpg",
    "size": 85305
  },
  {
    "id": "palmito_12",
    "category": "palmito",
    "categoryTitle": "Palmito y Agroindustria Envasadora",
    "title": "Producto Final de Palmito en Conserva para Exportación",
    "file": "assets/img/produccion/palmito/palmito_12.webp",
    "size": 23810
  },
  {
    "id": "piscicultura_1",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Albóndigas de Pescado de Tambaquí",
    "file": "assets/img/produccion/piscicultura/piscicultura_01.jpeg",
    "size": 95705
  },
  {
    "id": "piscicultura_2",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Chorizo de Pescado Amazónico con Valor Agregado",
    "file": "assets/img/produccion/piscicultura/piscicultura_02.jpeg",
    "size": 86376
  },
  {
    "id": "piscicultura_3",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Chuleta de Surubí Fresco de Corte Especial",
    "file": "assets/img/produccion/piscicultura/piscicultura_03.jpeg",
    "size": 71687
  },
  {
    "id": "piscicultura_4",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Alimento Balanceado a Base de Pescado",
    "file": "assets/img/produccion/piscicultura/piscicultura_04.jpeg",
    "size": 54724
  },
  {
    "id": "piscicultura_5",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Croquetas Nutritivas de Pescado",
    "file": "assets/img/produccion/piscicultura/piscicultura_05.jpeg",
    "size": 78114
  },
  {
    "id": "piscicultura_6",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Hamburguesas de Pescado del Trópico",
    "file": "assets/img/produccion/piscicultura/piscicultura_06.jpeg",
    "size": 82315
  },
  {
    "id": "piscicultura_7",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Alimentación Técnica en Pozas Piscícolas",
    "file": "assets/img/produccion/piscicultura/piscicultura_07.jpg",
    "size": 47902
  },
  {
    "id": "piscicultura_8",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Muestreo y Cosecha de Alevines con Red",
    "file": "assets/img/produccion/piscicultura/piscicultura_08.webp",
    "size": 140306
  },
  {
    "id": "piscicultura_9",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Manejo Técnico de Nutrición en Estanque",
    "file": "assets/img/produccion/piscicultura/piscicultura_09.jpeg",
    "size": 151353
  },
  {
    "id": "piscicultura_10",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Productor Piscícola en Complejo de Piscinas",
    "file": "assets/img/produccion/piscicultura/piscicultura_10.jpeg",
    "size": 192921
  },
  {
    "id": "piscicultura_11",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Faena de Pesca Comunitaria con Red de Arrastre",
    "file": "assets/img/produccion/piscicultura/piscicultura_11.jpg",
    "size": 51862
  },
  {
    "id": "piscicultura_12",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Lomitos Seleccionados de Paiche Amazónico",
    "file": "assets/img/produccion/piscicultura/piscicultura_12.jpeg",
    "size": 68558
  },
  {
    "id": "piscicultura_13",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Vista Aérea de Complejo de Piscinas Piscícolas",
    "file": "assets/img/produccion/piscicultura/piscicultura_13.jpeg",
    "size": 197106
  },
  {
    "id": "piscicultura_14",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Medallón de Pescado de Exportación",
    "file": "assets/img/produccion/piscicultura/piscicultura_14.jpeg",
    "size": 83802
  },
  {
    "id": "piscicultura_15",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Medallón Especial de Surubí del Trópico",
    "file": "assets/img/produccion/piscicultura/piscicultura_15.jpeg",
    "size": 72677
  },
  {
    "id": "piscicultura_16",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Milanesas de Tambaquí Empacadas al Vacío",
    "file": "assets/img/produccion/piscicultura/piscicultura_16.jpeg",
    "size": 86432
  },
  {
    "id": "piscicultura_17",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Nuggets de Pescado para Nutrición Escolar",
    "file": "assets/img/produccion/piscicultura/piscicultura_17.jpeg",
    "size": 80977
  },
  {
    "id": "piscicultura_18",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Pozas Familiares Integradas al Ecosistema",
    "file": "assets/img/produccion/piscicultura/piscicultura_18.jpeg",
    "size": 137960
  },
  {
    "id": "piscicultura_19",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Ejemplar Adulto de Tambaquí Recién Cosechado",
    "file": "assets/img/produccion/piscicultura/piscicultura_19.webp",
    "size": 66762
  },
  {
    "id": "piscicultura_20",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Conservación en Frío y Cadena de Hielo",
    "file": "assets/img/produccion/piscicultura/piscicultura_20.webp",
    "size": 130738
  },
  {
    "id": "piscicultura_21",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Presentación Gastronómica de Pescados del Trópico",
    "file": "assets/img/produccion/piscicultura/piscicultura_21.jpeg",
    "size": 1729097
  },
  {
    "id": "piscicultura_22",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Infraestructura de Estanques en Villa Tunari",
    "file": "assets/img/produccion/piscicultura/piscicultura_22.jpeg",
    "size": 287662
  },
  {
    "id": "piscicultura_23",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Módulo de Pozas Familiares de Crianza",
    "file": "assets/img/produccion/piscicultura/piscicultura_23.jpeg",
    "size": 165186
  },
  {
    "id": "piscicultura_24",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Tambaquí Eviscerado para Gastronomía",
    "file": "assets/img/produccion/piscicultura/piscicultura_24.jpeg",
    "size": 79792
  },
  {
    "id": "piscicultura_25",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Tambaquí Congelado Empacado para Distribución",
    "file": "assets/img/produccion/piscicultura/piscicultura_25.jpeg",
    "size": 79603
  },
  {
    "id": "piscicultura_26",
    "category": "piscicultura",
    "categoryTitle": "Piscicultura y Pozas Familiares",
    "title": "Panorámica Aérea de Piscinas Comunitarias",
    "file": "assets/img/produccion/piscicultura/piscicultura_26.jpeg",
    "size": 254118
  },
  {
    "id": "pina_1",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Control de Calidad y Calibre de Piña Tropical",
    "file": "assets/img/produccion/pina/pina_01.jpg",
    "size": 41068
  },
  {
    "id": "pina_2",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Familia Productora Campesina en Jornada de Cosecha",
    "file": "assets/img/produccion/pina/pina_02.jpg",
    "size": 14686286
  },
  {
    "id": "pina_3",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Cosecha Manual de Piña en Chaco de Chimoré",
    "file": "assets/img/produccion/pina/pina_03.jpg",
    "size": 49166
  },
  {
    "id": "pina_4",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Productor Campesino con Piña de Primera Calidad",
    "file": "assets/img/produccion/pina/pina_04.jpg",
    "size": 38859
  },
  {
    "id": "pina_5",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Logística y Transporte de Cajas de Piña",
    "file": "assets/img/produccion/pina/pina_05.jpg",
    "size": 129048
  },
  {
    "id": "pina_6",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Productora en Acopio de Cosecha de Piña",
    "file": "assets/img/produccion/pina/pina_06.jpg",
    "size": 72743
  },
  {
    "id": "pina_7",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Empaque de Piña Tropical para Mercados Exteriores",
    "file": "assets/img/produccion/pina/pina_07.jpg",
    "size": 44198
  },
  {
    "id": "pina_8",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Inspección en Cinta Transportadora",
    "file": "assets/img/produccion/pina/pina_08.jpg",
    "size": 796227
  },
  {
    "id": "pina_9",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Labores de Recolección en Campo de Piña",
    "file": "assets/img/produccion/pina/pina_09.jpg",
    "size": 183913
  },
  {
    "id": "pina_10",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Lavado y Selección en Pila de Acopio",
    "file": "assets/img/produccion/pina/pina_10.jpg",
    "size": 234047
  },
  {
    "id": "pina_11",
    "category": "pina",
    "categoryTitle": "Piña Tropical de Exportación",
    "title": "Piñas Tropicales de Exportación Listas para Envío",
    "file": "assets/img/produccion/pina/pina_11.jpg",
    "size": 61461
  },
  {
    "id": "dirigentes_1",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Comité de Dirigentes de las Seis Federaciones en Conferencia Oficial",
    "file": "assets/img/produccion/dirigentes/dirigentes_01.jpeg",
    "size": 1826112
  },
  {
    "id": "dirigentes_2",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Exposición de Cadenas Productivas ante Medios de Comunicación",
    "file": "assets/img/produccion/dirigentes/dirigentes_02.jpeg",
    "size": 2102834
  },
  {
    "id": "dirigentes_3",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Dirigentes Campesinos Presentando Muestras Agrícolas de Exportación",
    "file": "assets/img/produccion/dirigentes/dirigentes_03.jpeg",
    "size": 1074436
  },
  {
    "id": "dirigentes_4",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Mesa Institucional de la Mancomunidad de Municipios del Trópico",
    "file": "assets/img/produccion/dirigentes/dirigentes_04.jpeg",
    "size": 1213641
  },
  {
    "id": "dirigentes_5",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Demostración de Frutos y Derivados Agroindustriales del Trópico",
    "file": "assets/img/produccion/dirigentes/dirigentes_05.jpeg",
    "size": 902002
  },
  {
    "id": "dirigentes_6",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Representantes Sindicales y Productores en Encuentro Ferial",
    "file": "assets/img/produccion/dirigentes/dirigentes_06.jpeg",
    "size": 1207957
  },
  {
    "id": "dirigentes_7",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Coordinadora de las Seis Federaciones en la Sede Oficial",
    "file": "assets/img/produccion/dirigentes/dirigentes_07.jpeg",
    "size": 1266007
  },
  {
    "id": "dirigentes_8",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Exhibición de Productos Agroecológicos Campesinos",
    "file": "assets/img/produccion/dirigentes/dirigentes_08.jpeg",
    "size": 928033
  },
  {
    "id": "dirigentes_9",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Autoridades Municipales y Dirigentes del Trópico de Cochabamba",
    "file": "assets/img/produccion/dirigentes/dirigentes_09.jpeg",
    "size": 1082619
  },
  {
    "id": "dirigentes_10",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Firma y Compromiso de Soberanía Alimentaria FITROP 2026",
    "file": "assets/img/produccion/dirigentes/dirigentes_10.jpeg",
    "size": 1079084
  },
  {
    "id": "dirigentes_11",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Exposición de Piscicultura y Fruticultura por Dirigentes",
    "file": "assets/img/produccion/dirigentes/dirigentes_11.jpeg",
    "size": 966364
  },
  {
    "id": "dirigentes_12",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Mesa de Trabajo de Productores y Federación Central",
    "file": "assets/img/produccion/dirigentes/dirigentes_12.jpeg",
    "size": 1963039
  },
  {
    "id": "dirigentes_13",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Presentación a la Prensa de los Frutos del Trópico",
    "file": "assets/img/produccion/dirigentes/dirigentes_13.jpeg",
    "size": 1124428
  },
  {
    "id": "dirigentes_14",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Liderazgo Femenino Productor en las Seis Federaciones",
    "file": "assets/img/produccion/dirigentes/dirigentes_14.jpeg",
    "size": 2082832
  },
  {
    "id": "dirigentes_15",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Comitiva Oficial de Productores de Villa Tunari y Chimoré",
    "file": "assets/img/produccion/dirigentes/dirigentes_15.jpeg",
    "size": 2257024
  },
  {
    "id": "dirigentes_16",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Dirigentes de Carrasco Tropical y Centrales Unidas",
    "file": "assets/img/produccion/dirigentes/dirigentes_16.jpeg",
    "size": 1233245
  },
  {
    "id": "dirigentes_17",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Exposición de Banano y Piña por Dirigentes Agropecuarios",
    "file": "assets/img/produccion/dirigentes/dirigentes_17.jpeg",
    "size": 235252
  },
  {
    "id": "dirigentes_18",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Autoridades del Trópico Coordinando Espacios Feriales",
    "file": "assets/img/produccion/dirigentes/dirigentes_18.jpeg",
    "size": 190909
  },
  {
    "id": "dirigentes_19",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Dirigentes de Yungas de Chapare Exponiendo Miel de Bosque",
    "file": "assets/img/produccion/dirigentes/dirigentes_19.jpeg",
    "size": 181747
  },
  {
    "id": "dirigentes_20",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Productores de Entre Ríos y Bulo Bulo en Presentación",
    "file": "assets/img/produccion/dirigentes/dirigentes_20.jpeg",
    "size": 173978
  },
  {
    "id": "dirigentes_21",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Muestra Integral de Soberanía Alimentaria y Desarrollo",
    "file": "assets/img/produccion/dirigentes/dirigentes_21.jpeg",
    "size": 142430
  },
  {
    "id": "dirigentes_22",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Encuentro de Dirigentes Campesinos con Delegaciones",
    "file": "assets/img/produccion/dirigentes/dirigentes_22.jpeg",
    "size": 169971
  },
  {
    "id": "dirigentes_23",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Exposición de Palmito y Cacao por Representantes Sindicales",
    "file": "assets/img/produccion/dirigentes/dirigentes_23.jpeg",
    "size": 188161
  },
  {
    "id": "dirigentes_24",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Dirigentes Sindicales Explicando el Potencial del Trópico",
    "file": "assets/img/produccion/dirigentes/dirigentes_24.jpeg",
    "size": 169129
  },
  {
    "id": "dirigentes_25",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Rueda de Medios Oficial de FITROP 2026",
    "file": "assets/img/produccion/dirigentes/dirigentes_25.jpeg",
    "size": 190547
  },
  {
    "id": "dirigentes_26",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Comité Organizador Presentando la Oferta Productiva",
    "file": "assets/img/produccion/dirigentes/dirigentes_26.jpeg",
    "size": 206259
  },
  {
    "id": "dirigentes_27",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Demostración de Derivados Cárnicos y Piscícolas en Mesa",
    "file": "assets/img/produccion/dirigentes/dirigentes_27.jpeg",
    "size": 126390
  },
  {
    "id": "dirigentes_28",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Dirigentes de las Seis Federaciones Reafirmando el Compromiso",
    "file": "assets/img/produccion/dirigentes/dirigentes_28.jpeg",
    "size": 170002
  },
  {
    "id": "dirigentes_29",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Autoridades Municipales de la Mancomunidad en Exposición",
    "file": "assets/img/produccion/dirigentes/dirigentes_29.jpeg",
    "size": 184748
  },
  {
    "id": "dirigentes_30",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Productores del Trópico Promoviendo el Comercio Justo",
    "file": "assets/img/produccion/dirigentes/dirigentes_30.jpeg",
    "size": 185453
  },
  {
    "id": "dirigentes_31",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Presentación Oficial de los Productos Estrella de FITROP 2026",
    "file": "assets/img/produccion/dirigentes/dirigentes_31.jpeg",
    "size": 161848
  },
  {
    "id": "dirigentes_32",
    "category": "dirigentes",
    "categoryTitle": "Exposición Oficial de Dirigentes y Productores",
    "title": "Acto de Lanzamiento y Exposición de las Seis Federaciones",
    "file": "assets/img/produccion/dirigentes/dirigentes_32.jpeg",
    "size": 354142
  }
];

if (typeof window !== "undefined") {
  window.fitropData = fitropData;
}
