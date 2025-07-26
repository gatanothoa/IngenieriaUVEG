diccionario = {
    "nombre": "Emmanuel",
    "apellido": ["Córdova", "González", "Gómez"],
    "edad": 40,}

diccionario["nacionalidad"] = "Mexicana"  # Añadir un nuevo par clave-valor

consulta = diccionario["nombre"]

print(diccionario.keys())  # Imprime las claves del diccionario

print(diccionario)
print(diccionario["nombre"])  # Acceso a un valor por su clave
print(diccionario["apellido"][2])  # Acceso a otro valor por su clave

print(consulta)

dic = {"c1":["a", "b", "c"], "c2":["d", "e", "f"], "c3":["g", "h", "i"]}

print(dic["c1"][0].upper())  # Convierte a mayúsculas el valor de la clave "c2"