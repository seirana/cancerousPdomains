function [zch,M] = check_terms(n,m,l,w,LO,M)
    M = convertLOtoM(n,l,w,LO,M);
    b = false;
    for i = 1:n-l+1
        r2 = term2_checking(n,m,n-i+1,w,M);
        if r2 == true 
            r3 = term3_checking(n,m,n-i+1,w,M);
            if  r3 == false;
                b = true;
                break
            end
        else
            b = true;
            break;
        end
    end
    if b == false
        if w < m
            for i = w+1:m
                r2 = term2_checking(n,m,l,i,M);
                if r2 == true
                    r3 = term3_checking(n,m,l,i,M);
                    if r3 == false
                        b = true;
                        break;
                    end
                else
                    b = true;
                    break;
                end
            end
        end
    end 
    if (w == 1) && (l > 1) && (b == false)       
         for i = 1:n-m
            for j = 1:m
                r2 = term2_checking(n,m,i,j,M);
                if r2 == true 
                    r3 = term3_checking(n,m,i,j,M);
                    if  r3 == false;
                        b = true;
                        break
                    end
                else
                    b = true;
                    break;
                end                
            end
        end               
    end
    if (l == 1) && (w > 1) && (b == false)        
        for i = 1:n
            for j = 1:m-n
                r2 = term2_checking(n,m,i,j,M);
                if r2 == true 
                    r3 = term3_checking(n,m,i,j,M);
                    if  r3 == false;
                        b = true;
                        break
                    end
                else
                    b = true;
                    break;
                end                
            end
        end               
    end
    zch = ~b;
end