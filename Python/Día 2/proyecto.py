nombre = input("Introduce tu nombre: ").upper()
ventas = float(input("Introduce el total de ventas: "))
comision = round(ventas * 13/100,2)

print(f"Hola {nombre}, has vendido un  total de ${ventas} pesos este mes y tu comisión es de ${comision} pesos.")

