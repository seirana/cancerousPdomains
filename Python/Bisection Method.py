# Bisection Method

def f(x):
	return x**3 - 3
n = 1
a = 1.0
b = 2.0
x = (b+a)/2
print (f(x))
while f(x) > 0.001 or f(x) < -0.001:
	if f(a)*f(x) > 0:
		a = x
	elif f(a)*f(x) < 0:
		b = x
	x = (b+a)/2
	print ("n: ", n, "a: ", a, "x: ", x, "b: ", b, "f(x): ", f(x))
	n += 1