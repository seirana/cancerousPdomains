#include <stdio.h>
#include <iostream>
#include <sstream>
#include <fstream>

using namespace std;

int main(){
	
	std::ifstream file("file.csv");
	std::string str;
	int rowsM = 0;
	int colsM = 0;
	while(std::getline(file, str)){
		int cTemp = 0;

		for(int i = 0; i < str.length(); i++){
			if(str[i] == ','){
				cTemp++;
			}
		}
		if(cTemp > colsM)
		{
			colsM = cTemp;
		}
		if(cTemp){
			rowsM++;
		}
	}
	file.close();
	file.open("file.csv");
	int Matrix[rowsM][colsM + 1];
	int rC = 0;
	int cC = 0;
	while(std::getline(file, str)){	
		cC = 0;		
		string stemp = "";
		int i = 0;
		while(i < str.length()+1){		
			if(int((str[i]) > 47 && int(str[i])< 58) || str[i] == '-'){
				stemp = stemp + str[i];
			}
			else{				
				stringstream geek(stemp);
				int x = 0;
    			geek >> x;
				Matrix[rC][cC] = x;
				cC++;				
				stemp = "";				
			}
			i++;			
		}
		rC++;
	}
		
	printf("This program helps you to check the accuracy of the Matrix[rowsM][colsM], which has the following terms or does not.\n"
		"\t1) Each element of the matrix must be equal to -1, 1 or 2.\n" 
		"\t2) If one element equals to -1, then there is at least one 2 in the corresponding row or column of that element.\n"
		"\t3) If one element equals to -1, then the sum of the corresponding row and column is greater than 0.\n"
		"\t4) If one element equals to 1, then the sum of the corresponding row and column is greater than 2.\n" 
		"\t5) If one element equals to 2, then the sum of the corresponding row and column is greater than 3.\n\n\n"
	);
    bool term;
	int sum;
	for(int i = 0; i < rowsM; i++){
		for(int j = 0; j < colsM+1; j++){
			if(Matrix[i][j] != -1 && Matrix[i][j] != 1 && Matrix[i][j] != 2){
				printf("The matrix does not have the terms\n");
				return 0;
			}
			else{
				term = false;
				sum = 0;
			    for(int k = 1; k < rowsM; k++){
			    	sum = sum+Matrix[k][j];
					if(Matrix[k][j] == 2){
						term = true;
					}  
			    }
			    for(int k = 1; k< colsM+1; k++){
			    	sum = sum+Matrix[i][k];
					if(Matrix[i][k] == 2){
						term = true;          
					}
				}
				if((Matrix[i][j] == -1 && sum > 0 && term == true) || (Matrix[i][j] == 1 && sum > 2) || (Matrix[i][j] == 2 && sum > 3)){
					printf("The matrix has the terms\n");
					return 0;
				}
				else{
					printf("The matrix does not have the terms\n");
					return 0;
				}				
			}
		}
	}   
	return 0;
}
