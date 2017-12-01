#it chages the table's format to what we need to use in the website
import csv
import json

csvfile = open('csv_table.csv', 'r')
jsonfile = open('json_table.json', 'w')
reader = csv.reader(csvfile)
reader = [line for line in reader]
final = []

for i in range(0, len(reader[0])):
    jsonl = {}
    jsonl['name'] = reader[0][i]
    jsonl['domain'] = []
    for j in range(1, len(reader)):
        if reader[j][i]:
            jsonl['domain'].append(reader[j][i])
    final.append(jsonl)
json.dump(final, jsonfile)