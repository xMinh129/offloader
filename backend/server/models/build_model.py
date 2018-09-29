from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV
import pandas as pd
import numpy as np

#import data
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
    df = df.sample(20000)
    df = numeric(df)
    df = normalize(df)
    return df.ticket_no, df.drop(['ticket_no','willing_delay','willing_delay_cny'],axis=1), df.willing_delay, df.willing_delay_cny

def get_coeff(X,y):
    #Param tuning
    logreg = LogisticRegression()

    param_grid = {
        'C': np.logspace(1,4,10),
        'penalty': ['l1','l2']
        }

    logreg_cv = GridSearchCV(logreg, param_grid=param_grid, cv=5)
    logreg_cv.fit(X,y)
    C = logreg_cv.best_params_['C']
    penalty = logreg_cv.best_params_['penalty']
    #fit model
    clf = LogisticRegression(penalty=penalty, C=C)
    clf.fit(X,y)
    print(clf.coef_)
    return clf.coef_[0]


if __name__ == '__main__':
    df = import_data('mock_data.csv')
    a, X, y1,y2 = preprocess(df)
    theta1 = np.zeros(len(X.columns))
    theta2 = np.zeros(len(X.columns))
    for i in range(20):
        cust_id, X, y1, y2 = preprocess(df)
        theta1 = theta1 + get_coeff(X,y1)
        theta2 = theta2 + get_coeff(X,y2)
    theta1 = pd.Series(theta1/20, index=X.columns)
    theta2 = pd.Series(theta2/20, index=X.columns)
    print(theta1)
    print(theta2)
        
t1 = [-8.316023247148996, 7.390496535544129, -3.474414294194877, -6.395690968442976, 11.531621010864773, 1.858046693937737, -4.296546083926734, -4.2682773335564255, -0.872604910687722, -0.8756237058277373, -0.853438060347419, -0.898599310298378, -0.8189118115025188, -4.533575569388763, -1.5477787218019972, -1.9371974403107177, 0.28197142216472704]
t2 = [-8.13742761413348, 7.389876116071173, -3.1102254397988474, -6.456356276212944, 11.547952825978772, 1.6392209059910154, -4.299539590435781, -4.322184359470038, -11.71989314565338, -0.32054654848794095, -0.33743388408573816, -0.3610371576377754, -0.32351776967330614, -5.072370695588569, -1.954964968696801, -2.387751943244871, -0.12591017194451964]

        
    

  
