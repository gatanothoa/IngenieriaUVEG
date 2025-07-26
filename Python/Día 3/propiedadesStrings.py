"""
Propiedades de los strings en Python:

- Inmutabilidad: Los strings son inmutables, lo que significa que no pueden ser modificados después de su creación.
- Indexación: Se puede acceder a los caracteres individuales de un string usando índices, comenzando desde 0.
- Slicing: Es posible obtener subcadenas utilizando la notación de slicing (inicio:fin:paso).
- Concatenación: Los strings pueden ser concatenados usando el operador +.
- Repetición: Se pueden repetir strings usando el operador *.
- Métodos incorporados: Los strings cuentan con numerosos métodos útiles como .upper(), .lower(), .find(), .replace(), .split(), entre otros.
- Soporte para iteración: Los strings pueden ser iterados carácter por carácter en bucles.
- Compatibilidad con Unicode: Los strings en Python 3 soportan caracteres Unicode.
"""



poema = """En el circo Romano
La muerte de marciano
Marciano, mal cerradas las heridas
que recibió ayer mismo 
en aquel tormento"""

print(poema)
print("circo" in poema)  # Verifica si "circo" está en el poema
print("circo" not in poema)  # Verifica si "circo" no está en el poema
print(len(poema))  # Longitud del poema