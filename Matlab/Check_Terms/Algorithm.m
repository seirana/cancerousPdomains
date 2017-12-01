%Algorithm
    clc;
    clear;
    disp('This program helps you to check the accuracy of the Matrix[rowM][colM], which has the following terms or does not:\n');
    disp('    1) Each element of the matrix must be equal to -1, 1 or 2.\n'); 
    disp('    2) If one element equals to -1, then there is at least one 2 in the corresponding row or column of that element.\n');
    disp('    3) 1.If one element equals to -1, then the sum of the corresponding row and column is greater than 0.\n');
    disp('    3) 2.If one element equals to 1, then the sum of the corresponding row and column is greater than 2.\n'); 
    disp('    3) 3.If one element equals to 2, then the sum of the corresponding row and column is greater than 3.\n');
    
    filename = 'Matrix.xlsx';
    M = xlsread(filename);
    s = size(M);
    n = s(1)
    m = s(2)
    for i = 1:n
        for j = 1:m            
           r = check_terms(n,m,M,i,j);
           if r == false
               b = true;
               break;
           end           
        end
        if b == true
            break;
        end
    end
    disp('The result is:');
    if r == true 
        disp('The matrix has terms');
    else
        disp('The matrix doesnot have terms');
    end        