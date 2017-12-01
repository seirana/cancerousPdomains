import json

jsonfile = open('final4.json', 'w')
data = []
cancerNames = []
genes = []
# pfamDomains = []
final = []
with open('Stat.json') as data_file:
    data = json.load(data_file)
    for d in data['array']:
        cgLinks = {}
        cgLinks['name'] = d['cancer']
        cancerNames.append(d['cancer'])
        cgLinks['imports'] = d['genes']
        final.append(cgLinks)
        genes += d['genes']
    print cancerNames
    genesList = list(set(genes))
    for gene in genesList:
        cgLinks = {}
        cgLinks['name'] = gene
        cgLinks['imports'] = []
        for dicte in final:
            if gene in dicte['imports']:
                cgLinks['imports'].append(dicte['name'])
        final.append(cgLinks)

json.dump(final, jsonfile)
