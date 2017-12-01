function zc = convertLOtoM(n,l,w,LO,M)
    for ic = 1:w
        if LO(ic) == 0
            M(n-l+1,ic) = -1;
        else 
            M(n-l+1,ic) = LO(ic);
        end
    end
    for ic = 1:l-1
        if LO(w+ic) == 0
            M(n-l+ic+1,w) = -1;
        else 
            M(n-l+ic+1,w) = LO(ic+w);
        end                    
    end
    zc = M;
end