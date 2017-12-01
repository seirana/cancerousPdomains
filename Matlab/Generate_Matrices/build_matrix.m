function zb = build_matrix(n,m,l,w,mc,M,c)    
    while (l > 0) && (w > 0)
        if c == 0
            for i = 1:l+w-1
                LO(i) = 0; 
            end
            [r,M] = check_terms(n,m,l,w,LO,M);
            if r == true 
                if (l > 1) && (w > 1)
                    mc = build_matrix(n,m,l-1,w-1,mc,M,0); 
                else
                    M
                    mc = mc+1;
                    c = 1;
                end
            else
                c = 1;
            end        
        else
            lo = l+w-1;
            if lo > 0
                if LO(lo) < 2 
                    LO(lo) = LO(lo)+1;
                    [r,M] = check_terms(n,m,l,w,LO,M);
                    if r == true
                        if (l > 1) && (w > 1)
                            mc = build_matrix(n,m,l-1,w-1,mc,M,0);                      
                        else
                            M 
                            mc = mc+1;
                        end
                    end
                else
                    while (lo > 0) && (LO(lo) == 2)
                        lo = lo-1;
                    end
                    if lo > 0
                        LO(lo) = LO(lo)+1;
                        for i = lo+1:l+w-1
                            LO(i) = 0;
                        end
                        [r,M] = check_terms(n,m,l,w,LO,M);
                        if r == true
                            if (l > 1) && (w > 1)
                                mc = build_matrix(n,m,l-1,w-1,mc,M,0);
                            else
                                M
                                mc = mc+1;
                            end
                        end
                    else
                        zb = mc; 
                        return;
                    end
                end
            end
        end
    end  
end