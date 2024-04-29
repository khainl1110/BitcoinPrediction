from fastapi import FastAPI
import uvicorn

import pandas as pd
import joblib
import seaborn
import matplotlib.pyplot as plt
import numpy as np
import warnings
import random
warnings.filterwarnings("ignore")

app = FastAPI()

filename = './model.sav'
model = joblib.load(filename)
# print(model._predictWithLinearRegression('2024-05-01'))

# to run the app, cd into the directory, then use command: python -m uvicorn basic-app:app --reload
# call the method by http://localhost:8080/2024-05-01
@app.get('/{date}')
def main(date):
    class Predictor: 
        def __init__(self, X, y):
            self.X = X
            self.y = y
            self.y_btcHigh_pred = []
            self.x_btcHigh_train = []
            self.y_btcHigh_train = []
            
        def getAllPredictionsBTCHigh(self):
            return self.y_btcHigh_pred
        
        def getAllXTrainBTCHigh(self):
            return self.x_btcHigh_train
        
        def getAllYTrainBTCHigh(self):
            return self.y_btcHigh_train
        
            
        def _predictWithLinearRegression(self, date=None):
        
            model = LinearRegressionRegularization()
            utils = Utils()
            
            #New training data
            if (date!=None): 
                self.X = utils._newTrainingData({'Date': date}, self.X)
                
            # Split the data into training subsets
            train_data, test_data, = model._split(self.X, self.y, ratio=0.7, random_state=123 )
            X_train_btcHigh = train_data.drop(columns=['btcHigh'])
            y_train_btcHigh = train_data['btcHigh']
            #Adjust training data 
            X_train_btcHigh = utils._updateTrainingData(X_train_btcHigh)
            X_train_btcHigh = utils._replaceNanX(X_train_btcHigh)
            has_nan = X_train_btcHigh.isna().any().any()
            if (has_nan != True):
                #Predict
                y_pred_btcHigh = model._predict(X_train_btcHigh, y_train_btcHigh)
            else:
                print ("Training Data contains Nan values, ", has_nan)
            pd.options.mode.chained_assignment = None  #Hide warning
            X_train_btcHigh["Date"] = utils._updateDate(X_train_btcHigh)
            
            self.y_btcHigh_pred = y_pred_btcHigh 
            self.x_btcHigh_train = X_train_btcHigh 
            self.y_btcHigh_train = y_train_btcHigh 
            
            return y_pred_btcHigh.tail(1).to_string(index=False)
        
    class LinearRegressionRegularization:
        def __init__(self, max_iter=2,  learningRate=80, random_state=None):
            self.max_iter_ = max_iter
            self.alpha = learningRate
            self.random_state_ = random_state
            self.w_ = np.random.randint(0, 1, 17)
            self.w0 = 0
        
        def _split(self, X, y, ratio, random_state):
            header = X.columns
            # remove header for shuffling 
            x_data = X.values

            random.seed(random_state)
            train_ratio = ratio
            test_ratio = 1 - train_ratio
            
            total_data_sample = len(X)
            train_samples = int(total_data_sample * train_ratio)
            test_samples = total_data_sample - train_samples

            random.shuffle(x_data)
            shuffled_data = pd.DataFrame(x_data, columns=header)

            train_data = shuffled_data.head(train_samples)
            test_data = shuffled_data.head(test_samples)
            
            return train_data, test_data
        
        def _predict(self, x_train, y_train):
            #TO-DO : Add Regularization 
            
            x_train_array = x_train.to_numpy()
            m = len(y_train) # number of features 
            #Initial weights 
            tempWeights = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
            tempW0 = 0
            y_pred_btc = tempW0
            
            for idx in range (self.max_iter_): 
                for i in range (m):
                    summation = []
                    xi = x_train_array[i, :]
                    y_pred_btc = tempW0
                    for k in range (17):
                        y_pred_btc += self.w_[k] * xi[k]
                    summation.append(y_pred_btc - y_train)

                    derivative = 2/m * sum(summation)
                    tempW0 = self.w0 - (self.alpha * derivative)

                for j in range (17):
                    for i in range (m): 
                        summation = []
                        xi = x_train_array[i, :]
                        y_pred_btc = tempW0 
                        for k in range (17):
                            y_pred_btc += self.w_[k] * xi[k]  

                        summation.append(y_pred_btc - y_train)
                    derivative = 2/m * sum(summation)
                    tempWeights.append(self.w_[j] - (self.alpha * derivative))    

                #The previous iteration 
                last_17 = tempWeights[-17:]

                #Assigning new weight values to old weights
                for n in range (17):
                    tempWeights[n] = last_17[n]
                self.w0 = tempW0
                #next iteration

            final_weights = tempWeights[:17]
            self.w_ = final_weights
            
            return y_pred_btc
    
    class Utils:
    
        def _updateTrainingData(self, x_train):
            for i in x_train.columns:
                if i != 'Date':
                    x_train['yesterday_' +i] = x_train[i]
                    x_train['twoDaysAgo_' +i] = x_train[i]
                    x_train['threeDaysAgo_' +i] = x_train[i]
                    x_train['fourDaysAgo_' +i] = x_train[i]
                    x_train['fiveDaysAgo_' +i] = x_train[i]
                    x_train['sixDaysAgo_' +i] = x_train[i]
                    x_train['sevenDaysAgo_' +i] = x_train[i]
                    x_train['yesterday_' +i] = x_train['yesterday_' +i].shift(1)
                    x_train['twoDaysAgo_' +i] = x_train['twoDaysAgo_' +i].shift(2)
                    x_train['threeDaysAgo_' +i] = x_train['threeDaysAgo_' +i].shift(3)
                    x_train['fourDaysAgo_' +i] = x_train['fourDaysAgo_' +i].shift(4)
                    x_train['fiveDaysAgo_' +i] = x_train['fiveDaysAgo_' +i].shift(5)
                    x_train['sixDaysAgo_' +i] = x_train['sixDaysAgo_' +i].shift(6)
                    x_train['sevenDaysAgo_' +i] = x_train['sevenDaysAgo_' +i].shift(7)
                    x_train = x_train.drop(i, axis = 1)
            return x_train
    
        def _updateDate(self, x_train):
            x_train["Date"]
            x_train['Date'] = x_train['Date'].astype(str)
            
            for k in range (len(x_train["Date"])):
                size = len(x_train["Date"][k])
                string = x_train["Date"][k]
                substring_to_remove = ".0"
                x_train.loc[k]['Date'] = string.replace(substring_to_remove, "")

            for k in range (len(x_train["Date"])):
                size = len(x_train["Date"][k])
                string = x_train["Date"][k]
                x_train.loc[k]['Date'] = string[:4] + "-" + string[4:]
                #print(result)

            for k in range (len(x_train["Date"])):
                size = len(x_train["Date"][k])
                string = x_train["Date"][k]
                x_train.loc[k]['Date'] = string[:7] + "-" + string[7:]
            
            return x_train['Date']
    
        def _replaceNanY(self, y_train):
            column_means_7days =  y_train.tail(7).mean()
            df_filled = y_train_btcHigh.fillna(column_means_7days)
            y_train = df_filled
            
            return y_train
    
        def _replaceNanX(self, x_train):
            column_means = x_train.mean()
            df_filled = x_train.fillna(column_means)
            x_train = df_filled
            
            return x_train
    
        def _newTrainingData(self, new_row, x_train):
            index = len(x_train)
            x_train.loc[index] = new_row
            x_train_temp = x_train
            return x_train_temp

        
        def _newTrainLabel(self, y_train):
            column_means_7days = y_train.tail(7).mean()
            new_row = pd.Series({'btcHigh': column_means_7days})
            y_train_temp = y_train.append(new_row, ignore_index=True)
            return y_train_temp
        
    
    return {'message': model._predictWithLinearRegression(date)}