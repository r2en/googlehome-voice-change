import csv
def func(arr ,text):
    d = OrderedDict()
    d['speech'] = arr + '.mp3'
    d['text']= text
    return d

dic = {}

from collections import OrderedDict
with open('19:36.csv', 'r') as f:
    reader = csv.reader(f)
    for line in reader:
        obj = func(line[1], line[2])
        dic.setdefault(line[1], obj)
print(dic)