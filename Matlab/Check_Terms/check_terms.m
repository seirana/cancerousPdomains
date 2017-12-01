function z = check_terms(n,m,M,i,j)
    t2 = term2_checking(n,m,M,i,j);
    if t2 == true
        t3 = term3_checking(n,m,M,i,j);
        if t3 == true
            z = true;
        else 
            z = false;
        end
    else
        z = false;
    end
end