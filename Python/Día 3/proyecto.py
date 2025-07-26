texto = input("Por favor ingresa el texto a analizar: ").lower()
letra1 = input("Por favor ingresa la primer letra para analizar: ").lower()
letra2 = input("Por favor ingresa la segunda letra para analizar: ").lower()
letra3 = input("Por favor ingresa la tercer letra para analizar: ").lower()
letrasLista = [letra1,letra2,letra3]

contarLetras1 = texto.count(letrasLista[0])
contarLetras2 = texto.count(letrasLista[1])
contarLetras3 = texto.count(letrasLista[2])

palabras = texto.split()
totalPalabras = len(palabras)

inicio = texto[0]
fin = texto[-1]
reves = " ".join(palabras[::-1])


print("python" in texto)

print(f"Tu texto es el siguiente {texto} y contiene la letra {contarLetras1} veces, la letra {contarLetras2} veces y la letra {contarLetras3} veces. El total de palabras es de {totalPalabras} palabras, la primera letra es {inicio} y la ultima letra es {fin} Las palabras al reves son {reves}")