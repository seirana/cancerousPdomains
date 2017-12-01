function z3 = term3_checking(n,m,l,w,M)
    t3 = false;
    sum = 0;
    for i3 = 1:m
        sum = sum+M(n-l+1,i3);
    end
    for i3 = 1:n
        sum = sum+M(i3,w);
    end
    if (M(n-l+1,w) == -1 && sum >=1) || (M(n-l+1,w) == 1 && sum >=3) || (M(n-l+1,w) == 2 && sum >=4)
        t3 = true;
    end
    z3 = t3;
end