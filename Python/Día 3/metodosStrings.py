texto = "Este es el texto de Emmanuel"
resultado = texto.upper()  # Convierte a mayúsculas
resultado1 = texto.lower()  # Convierte a minúsculas
resultado2 = texto.split("e")  # Divide el texto en una lista de palabras
a = "Aprender"
b = "Python"
c = "es genial"
e = " ".join([a, b, c])  # Une las palabras con un espacio
resultado3 = texto.find("textou")  # Encuentra la posición de la palabra "texto"
resultado4 = texto.replace("Emmanuel", "Juan")  # Reemplaza "Emmanuel" por "Juan"


print(resultado)
print(resultado1)
print(resultado2)
print(e)  # Imprime el texto unido
print(resultado3)  # Imprime la posición de "texto"
print(resultado4)  # Imprime el texto con "Emmanuel" reemplazado por "Juan"