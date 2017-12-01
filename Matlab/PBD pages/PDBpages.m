% This program, reads URL pages from http://www.rcsb.org. save them as txt file and extract some information with we need.
% information about protein ID, approved gene ID, HGNC ID, chromosome, strand, stanscription start and end, protein coding 
%region starts and ends, number of exons, exons starts and end, and 
clc;clear;
[~,~,IDs] = xlsread('Protein_Gene_IDs.xlsx');
[r_IDs,~] = size(IDs);
PDB = cell(r_IDs,13);
for i = 2:r_IDs
    %it writes ulr pages in txt files
    urlwrite(strcat('http://www.rcsb.org/pdb/gene/',IDs{i,2}),strcat(IDs{i,1},'.txt'));
    %reads txt files to extract needed informations
    file_name = strcat(IDs{i,1},'.txt');
    file = fileread(file_name);
    file_length = length(file);
    j = 1;
    %%%%%%%%%%%%%1 uniprot ID
    find = false;
    word_lenght = length('href="http://www.uniprot.org/uniprot/');
    while j < file_length - word_lenght && find == false
        word = '';
        for k = 1:word_lenght
            word = strcat(word,file(j));
            j = j+1;
        end
        if isequal(word,'href="http://www.uniprot.org/uniprot/')
            temp = '';
            while isequal(file(j),'"') == 0
                temp = strcat(temp,file(j));
                j = j+1;
            end
            PDB{i,1} = temp;
            find = true;
        else
            j = j-word_lenght+1;
        end
    end
    %%%%%%%%%%%%%2 gene symbol 
    if find == true
        find = false;
        word_lenght = length('href="http://www.genenames.org/cgi-bin/gene_symbol_report?match=');
        while j < file_length-word_lenght && find == false
            word = '';
            for k = 1:word_lenght
                word = strcat(word,file(j));
                j = j+1;
            end
            if isequal(word,'href="http://www.genenames.org/cgi-bin/gene_symbol_report?match=')
                temp = '';
                while isequal(file(j),'"') == 0
                    temp = strcat(temp,file(j));
                    j = j+1;
                end
                PDB{i,2} = temp;
                find = true;
            else
                j = j-word_lenght+1;
            end
        end
        %%%%%%%%%%%%%3 HGNC ID
        find = false;
        word_lenght = length('href="http://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=HGNC:');
        while j < file_length-word_lenght && find == false
            word = '';
            for k = 1:word_lenght
                word = strcat(word,file(j));
                j = j+1;
            end
            if isequal(word,'href="http://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=HGNC:')
                temp = '';
                while isequal(file(j),'"') == 0
                    temp = strcat(temp,file(j));
                    j = j+1;
                end
                PDB{i,3} = temp;
                find = true;
            else
                j = j-word_lenght+1;
            end
        end
        find = false;
        word_lenght = length('GeneChromosomePosition');
        while j < file_length-word_lenght && find == false
            word = '';
            for k = 1:word_lenght
                word = strcat(word,file(j));
                j = j+1;
            end
            if isequal(word,'GeneChromosomePosition')
                %%%%%%%%%%%%%4 chromorome
                find_str = false;
                word_lenght = length('chromosome=chr');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'chromosome=chr')
                        temp = '';
                        while isequal(file(j),',') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,4} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                %%%%%%%%%%%%%5 strand
                find_str = false;
                word_lenght = length('orientation=');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'orientation=')
                        temp = '';
                        while isequal(file(j),',') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,5} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                %%%%%%%%%%%%%6 transcription start
                find_str = false;
                word_lenght = length('transcriptionStart=');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'transcriptionStart=')
                        temp = '';
                        while isequal(file(j),',') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,6} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                %%%%%%%%%%%%%7 transcription end
                find_str = false;
                word_lenght = length('transcriptionEnd=');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'transcriptionEnd=')
                        temp = '';
                        while isequal(file(j),',') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,7} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                %%%%%%%%%%%%%8 protein coding region start
                find_str = false;
                word_lenght = length('cdsStart=');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'cdsStart=')
                        temp = '';
                        while isequal(file(j),',') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,8} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                %%%%%%%%%%%%%9 protein coding region end
                find_str = false;
                word_lenght = length('cdsEnd=');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'cdsEnd=')
                        temp = '';
                        while isequal(file(j),',') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,9} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                %%%%%%%%%%%%%10 exin count
                find_str = false;
                word_lenght = length('exonCount=');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'exonCount=')
                        temp = '';
                        while isequal(file(j),',') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,10} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                %%%%%%%%%%%%%11 exon starts
                find_str = false;
                word_lenght = length('exonStarts=[');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'exonStarts=[')
                        temp = '';
                        while isequal(file(j),']') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,11} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                %%%%%%%%%%%%%12 exon ends
                find_str = false;
                word_lenght = length('exonEnds=[');
                while j < file_length-word_lenght && find_str == false
                    word_str = '';
                    for k = 1:word_lenght
                        word_str =  strcat(word_str,file(j));
                        j = j+1;
                    end
                    if isequal(word_str,'exonEnds=[')
                        temp = '';
                        while isequal(file(j),']') == 0
                            temp = strcat(temp,file(j));
                            j = j+1;
                        end
                        PDB{i,12} = temp;
                        find_str = true;
                    else
                        j = j-word_lenght+1;
                    end
                end
                find = true;
            else
                j = j-word_lenght+1;
            end
        end
        %%%%%%%%%%%%%13 lenght
        find_str = false;
        word_lenght = length('Length');
        while j < file_length-word_lenght && find_str == false
            word_str = '';
            for k = 1:word_lenght
                word_str =  strcat(word_str,file(j));
                j = j+1;
            end
            if isequal(word_str,'Length')
                while double(file(j)) < 48 || double(file(j)) > 57
                    j = j+1;
                end
                temp = '';
                while isequal(file(j),'n') == 0
                    temp = strcat(temp,file(j));
                    j = j+1;
                end
                PDB{i,13} = temp;
                find_str = true;
            else
                j = j-word_lenght+1;
            end
        end
    else
        if find == false
            PDB{i,1} = 'Fail'; %it writes "fail" when there is no page for the given gene
        end
    end
    disp(i);
end
xlswrite('PDB.xlsx',PDB,'A');