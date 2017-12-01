import csv
import json

csvfile = open('Stat.csv', 'r')
jsonfile = open('Stat.json', 'w')
reader = csv.reader(csvfile)
reader = [line for line in reader]
final = []
cancers = reader[0]
# print reader
for i in range(1, len(reader[0]) - 1):
    # print i, reader[i]
    jsonl = {}
    jsonl['cancer'] = reader[0][i]
    jsonl['genes'] = []
    j = 0
    while reader[j][i] and j < len(reader) - 1:
        jsonl['genes'].append(reader[j][i])
        j += 1
    final.append(jsonl)

json.dump(final, jsonfile)
