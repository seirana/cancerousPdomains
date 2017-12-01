    clc;
    clear;
    disp('This program calculates and shows all by n*m matrices with 3 terms:\n')
    disp('    1) Each element of the matrix must be equal to -1, 1 or 2.\n'); 
    disp('    2) If one element equals to -1, then there is at least one 2 in the corresponding row or column of that element.\n');
    disp('    3) 1.If one element equals to -1, then the sum of the corresponding row and column is greater than 0.\n');
    disp('    3) 2.If one element equals to 1, then the sum of the corresponding row and column is greater than 2.\n'); 
    disp('    3) 3.If one element equals to 2, then the sum of the corresponding row and column is greater than 3.\n');

    n = input('Insert the lenght of the matrix: ');
    m = input('Insert left weight of the matrix: ');
    disp('Matrices are: ')
    for i = 1:n
        for j = 1:m
            M(i,j) = 0;
            
        end
    end
    l = n;
    w = m;
    mc = 0;
    Total = build_matrix(n,m,l,w,mc,M,0);
    disp('Searching finished')
    disp('There is no more matrix')
    disp('The total number of available matrices is: ')
    Total    