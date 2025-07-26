# Clase: Formateo de Cadenas en Python

# 1. Concatenación simple
nombre = "Ana"
edad = 25
mensaje = "Hola, mi nombre es " + nombre + " y tengo " + str(edad) + " años."
print(mensaje)

# 2. Formateo con el operador %
mensaje2 = "Hola, mi nombre es %s y tengo %d años." % (nombre, edad)
print(mensaje2)

# 3. Método format()
mensaje3 = "Hola, mi nombre es {} y tengo {} años.".format(nombre, edad)
print(mensaje3)

# 4. f-strings (desde Python 3.6)
mensaje4 = f"Hola, mi nombre es {nombre} y tengo {edad} años."
print(mensaje4)

# 5. Formateo con alineación y decimales
pi = 3.14159265
print(f"El valor de pi es {pi:.2f}")  # Solo 2 decimales
print(f"{'Nombre':<10} | {'Edad':>3}")  # Alineación de columnas

# 6. Ejercicio práctico
usuario = input("¿Cuál es tu nombre? ")
años = int(input("¿Cuántos años tienes? "))
print(f"¡Bienvenido, {usuario}! Tienes {años} años.")

# Resumen:
# - Usa + para concatenar, pero cuidado con los tipos.
# - Usa % para formateo clásico.
# - Usa .format() para mayor flexibilidad.
# - Usa f-strings para código más limpio y moderno.