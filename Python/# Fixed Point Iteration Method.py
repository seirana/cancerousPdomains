# Fixed Point Iteration Method

e = 2.718281828
def g(x):
	return ((1.0/3)*e**x)**(.5)

tmp = .5
for i in range(0,20):
	print (g(tmp))
	tmp = g(tmp)
print ('-----------------')
# C
from math import log
e = 2.718281828
# def g(x):
# 	return ((1.0/3)*e**x)**(.5)
def g(x):
	return log(3*x**2)
tmp = 4
for i in range(0,20):
	print (g(tmp))
	tmp = g(tmp)