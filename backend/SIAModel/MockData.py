import csv
import numpy as np
import pandas as pd

header = ['gender','age','nationality','corporate','number_of_tickets','number_of_baggages','flight_class','flexible_dates','booked_days_advance']

def ran(mean, sd, offset=0):
    return offset + np.floor(abs(np.random.normal(mean,sd,200000)))

def ind(ratio):
    s = []
    for i in range(200000):
        p = np.random.random()
        m = 0
        for k in ratio:
            if k > p:
                s.append(m)
                break
            else:
                p -= k
                m += 1
    return s

def cat(categories, ratio):
    index = ind(ratio)
    return np.array(list(map(lambda x:categories[x], index)))

gender = cat(['Male','Female'],[0.55,0.45])
age = ran(10,15,20)
nationality = cat(['Singaporean','Malaysian','Chinese','Indonesian','Others'], [0.625,0.1,0.075,0.05,0.15])
corporate = cat([False, True],[0.85,.15])
number_of_tickets = np.maximum(1, ran(1,1.2))
number_of_baggages = np.maximum(1, ran(1.7,2))
flight_class = cat(['Business', 'Economy','Premium economy','First class'],[.3,.4,.2,.1])
flexible_dates = cat([False,True],[.6,.4])
booked_days_advance = ran(45,30)

s = header.pop(0)
df = pd.Series(eval(s), index=range(200000), name=s)
for i in header:
    s = pd.Series(eval(i), index=range(200000), name=i)
    df = pd.concat([df,s], axis=1)

df2 = df.copy()

#Clean data
def impute(col):
    ref = {}
    for i,k in enumerate(col.unique()):
        ref[k] = i
    col.apply(lambda x:ref[x], inplace=True)

def normalize(col):
    a = min(col)
    b = max(col)
    return col.apply(lambda x:(x-a)/(b-a))
    
df2 = pd.DataFrame(index=range(200000))
for i in df.columns:
    if df[i].dtype != float and df[i].dtype != int:
        s = pd.get_dummies(df[i], prefix=i)
    else:
        s = normalize(df[i])
    df2 = pd.concat([df2,s],axis=1)
        
#Create Target
def sig(a):
    return 1/(1+np.exp(-a))

def output(a):
    if a > 0.5:
        return True
    else:
        return False

def countif(lst, cond):
    k = 0
    for i in lst:
        if i == cond:
            k += 1
    return k
'''
coeff1 = [0,0,-0.005,0,0,0,0,0,-0.003,0.001,-0.002,-0.004, -0.0006,0.001,0.0008, 0.002, -0.004,0.002, 0.001]
coeff2 = [0,0,-0.005,-0.5,0,0,0,0,-0.003,0.001,-0.002,-0.004, -0.0006,0.001,0.0008, 0.002, -0.004,0.002, 0.001]

a = np.random.normal(-0.001,0.00001,200000)
def get_result(df, coeff, name):
    result = a
    for i,k in enumerate(df.columns):
        result += coeff[i]*df[k]
    result.name = name
    result += + np.random.normal(0,0.001,200000)
    result = sig(result)
    return result.apply(output)

df = pd.concat([df,get_result(df2, coeff1, 'willing_delay')], axis=1)
df = pd.concat([df,get_result(df2, coeff2, 'willing_delay_cny')], axis=1)

print(countif(df.willing_delay, True))
print(countif(df.willing_delay_cny, True))

df.to_csv('mock_data.csv', index_label='ticket_no')


'''



