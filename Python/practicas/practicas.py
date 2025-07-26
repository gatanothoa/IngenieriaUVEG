# REPASO COMPLETO - DÍAS 1, 2 y 3
# ===================================

# ---- DÍA 1: FUNDAMENTOS ----

# Ejercicio 1: Print y Variables Básicas
print("¡Hola! Vamos a repasar Python desde el inicio")

nombre = "Emmnuel"
edad = 40
ciudad = "Puebla"

print(f"Hola me llamo {nombre}, tengo {edad} años y vivo en la ciudad de {ciudad}")

# Ejercicio 2: Input y Interacción
print("\n--- Ejercicio 2: Input ---")

comida = input("¿Cuál es tu comida favorita? ")
color = input("¿Cuál es tu color favorito? ")

print ("Tu comida favorita es " + comida + " y es de color " + color)

# Ejercicio 3: Strings Básicos
print("\n--- Ejercicio 3: Strings ---")

frase = "Python es un lenguaje de programación versátil y poderoso."

print(frase.upper())
print(frase.lower())
print(len(frase))
print(frase[0])
print(frase[-1])

# ---- DÍA 2: NÚMEROS Y CONVERSIONES ----

# Ejercicio 4: Variables Numéricas
print("\n--- Ejercicio 4: Números ---")

edad_años = 40
altura_metros = 1.72
peso_kg = 82

indice_MC = peso_kg/(altura_metros ** 2)

print(f"Con tu edad de {edad_años} y tu peso es de {peso_kg} con tu altura de {altura_metros} tu IMC es de {indice_MC}")

# Ejercicio 5: Conversiones de Tipos
print("\n--- Ejercicio 5: Conversiones ---")

edad = int(input("¿Cuál es tu edad? "))
salario = float(input("¿Cuál es tu salario mensual? "))

salario_anual = salario * 12

print(f"Tu edad es de {edad} años y tienes un salario de ${salario} mensual y lo que ganarás al año es de ${salario_anual} y si no te gastas nada en 10 años tendrás ${salario_anual * 10}")

# Ejercicio 6: Formateo de Strings Avanzado
print("\n--- Ejercicio 6: Formateo ---")

precio = 1234.5678
descuento = 0.15
precio_final = precio - (precio * descuento)

print(f"Precio SIN formato: ${precio}")
print(f"Precio CON formato: ${precio:.2f}")
print(f"Descuento del: {descuento:.1%}")
print(f"Precio final: ${precio_final:.2f}")

# Ejercicio 7: Operaciones Matemáticas
print("\n--- Ejercicio 7: Matemáticas ---")

a = 17
b = 5

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** {b} = {a ** b}")

# ---- DÍA 3: ESTRUCTURAS DE DATOS ----

# Ejercicio 8: Listas
print("\n--- Ejercicio 8: Listas ---")

frutas = ["manzana", "banana", "naranja", "kiwi"]

frutas.append("uva")

# Ejercicio 9: Diccionarios
print("\n--- Ejercicio 9: Diccionarios ---")


persona = {
    "nombre": "Emmanuel",
    "edad": 40,
    "ciudad": "Puebla",
    "estado": "Soltero",
}

persona["profesión"] = "Estudiante de Python"
persona["edad"] = 31

print(f"Diccionario completo: {persona}")
print(f"Claves: {list(persona.keys())}")
print(f"Valores: {list(persona.values())}")
print(f"Nombre: {persona['nombre']}")
print(f"Nueva edad: {persona['edad']} años")

# Ejercicio 10: Tuples
print("\n--- Ejercicio 10: Tuples ---")

# Crear una tupla de coordenadas
coordenadas = (10.5, 20.3)

# Crear una tupla de colores
colores = ("rojo", "verde", "azul", "amarillo")

# Crear una tupla mixta
datos_personales = ("Emmanuel", 31, "Puebla", True)

print(f"Estas son las coordenadas: {coordenadas}")
print(f"Estos son los colores disponibles: {colores}")
print(f"Estos son los datos personales: {datos_personales}")

print(f"Segunda coordenada: {coordenadas[1]}")
print(f"Este es el cuarto color: {colores[3]}")
print(f"Esta es mi edad: {datos_personales[1]}")
print(f"Esta es la cantidad de colores: {len(colores)}")

numeros = {1, 2, 3, 4, 5}
frutas = {"manzana", "banana", "naranja"}
numeros.add(6)
numeros.add(6)
frutas{"kiwi"}

print(f"Este es un conjunto de {numeros}")
print(f"Este es un conjunto de frutas {frutas}")

es_estudiante = True
tiene_trabajo = False   
es_mayor_de_edad = True

puede_estudiar = es_estudiante and not tiene_trabajo
puede_trabajar = es_mayor_de_edad and not es_estudiante

print(f"¿Es estudiante {es_estudiante}")
print(f"¿Puede estudiar tiempo completo? {puede_estudiar}")
print(f"¿puede estudiar tiempo completo? {puede_trabajar}")

