import numpy as np
import pandas as pd

t1 = [-8.316023247148996, 7.390496535544129, -3.474414294194877, -6.395690968442976, 11.531621010864773, 1.858046693937737, -4.296546083926734, -4.2682773335564255, -0.872604910687722, -0.8756237058277373, -0.853438060347419, -0.898599310298378, -0.8189118115025188, -4.533575569388763, -1.5477787218019972, -1.9371974403107177, 0.28197142216472704]
t2 = [-8.13742761413348, 7.389876116071173, -3.1102254397988474, -6.456356276212944, 11.547952825978772, 1.6392209059910154, -4.299539590435781, -4.322184359470038, -11.71989314565338, -0.32054654848794095, -0.33743388408573816, -0.3610371576377754, -0.32351776967330614, -5.072370695588569, -1.954964968696801, -2.387751943244871, -0.12591017194451964]
path = "/Users/Darius/Desktop/offloader/backend/SIAModel/input_example.csv"

#import datapip
def import_data(path): 
    return pd.read_csv(path, header=0)

def numeric(df):
    # Convert all categorial to numbers
    cat_var=[]
    boo_var=[]
    for i in df.columns:
        if df[i].dtype != int and df[i].dtype != float and df[i].dtype != bool:
            cat_var.append(i)
    df = pd.concat([df, pd.get_dummies(df[cat_var])], axis=1)
    df.drop(cat_var, axis=1, inplace=True)
    df.replace([True, False],[1,0],inplace=True)
    return df

def normalize(df):
    #converall all number within 0-1 
    rang = np.max(df)-np.min(df)
    return (df-np.min(df))/rang

def preprocess(df):
    cust = df.ticket_no
    df.drop(['ticket_no'],axis=1,inplace=True)
    df = numeric(df)
    df = normalize(df)
    return cust, np.matrix(df)

def predict(cust, t, df):
    pred = np.array(np.inner(t, df))[0]
    return pd.Series(pred, index=cust, name='Likelihood').sort_values(ascending=False)

#call this function
def output(data, cny=False):
    #data is either a dataframe with the same column names and data type as input_example.csv
    #or a path to a csv file with the same column names
    #e.g. output('input_example.csv'), run this script to see what happens
    #
    #cny is set as False by default.
    #When set to true, code uses a different model that decrease weightage of chinese nationals
    if cny:
        t = t2
    else:
        t = t1
    if type(data) == str:
        df = import_data(path)
        try:
            df.drop(['willing_delay','willing_delay_cny'],axis=1,inplace=True)
        except:
            pass
    else:
        df = data
    cust, df = preprocess(df)
    return predict(cust, t, df)

if __name__=='__main__':
    print(output('input_example.csv'))
