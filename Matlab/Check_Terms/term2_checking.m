function z2= term2_checking(n,m,M,i,j)
    term2 = false;
    if M(i,j) == -1
        for i2 = 1:n
            if M(i2,j) == 2
                term2 = true;
                break;
            end
        end
        if term2 == false
            for j2 = 1:m
                if M(i,j2) == 2
                    term2 = true;
                    break;
                end
            end 
        end
    else if (M(i,j) == 1) || (M(i,j) == 2)
            term2 = true;
        end
    end
    z2 = term2;
end