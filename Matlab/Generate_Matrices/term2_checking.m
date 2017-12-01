function z2 = term2_checking(n,m,l,w,M)
    t2 = false;
    if M(n-l+1,w) == -1
        for i2 = 1:m
            if M(n-l+1,i2) == 2
                t2 = true;
                break;
            end
        end
        if t2 == false
            for i2 = 1:n
                if M(i2,w) == 2
                    t2 = true;
                    break;
                end
            end
        end
    else if (M(n-l+1,w) == 1) || (M(n-l+1,w) == 2)
            t2 = true;
        end
    end
    z2 = t2;
end