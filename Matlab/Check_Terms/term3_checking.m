function z3= term3_checking(n,m,M,i,j)
    term3 = false;
    sum = 0;
    for i3 = 1:n
        sum = sum+M(i3,j);
    end
    for j3 = 1:m
        sum = sum+M(i,j3);
    end
    if ((M(i,j) == -1) && (sum >= 2)) || ((M(i,j) == 1) && (sum >= 3)) || ((M(i,j) == 2) && (sum >= 4))            term2 = true;
            term3 = true;
    end
    z3 = term3;
end