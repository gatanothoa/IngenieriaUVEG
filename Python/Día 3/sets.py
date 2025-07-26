mi_set = set([1,2,3,4,5,6,7,8,9,10])

print(mi_set)
print(type(mi_set))

otro_set = {'Juan', 'Pedro', 'Maria', 'Ana'}

s1 = {1, 2, 3, 4, 5}
s2 = {4, 5, 6, 7, 8}
s2.add(9)  # Añadir un elemento al conjunto
s2.remove(4)  # Eliminar un elemento del conjunto
s2.discard(5)  # Eliminar un elemento sin lanzar error si no existe

s3 = s1.union(s2)  # Unión de conjuntos
print(s3)   

print(otro_set)
print(type(otro_set))