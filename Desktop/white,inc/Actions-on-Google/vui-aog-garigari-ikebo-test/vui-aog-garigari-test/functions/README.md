![](2018-08-14-19-08-45.png)
d = {}
for a, t in zip(arr, text):
    d['speech']=arr
    d['text']=text
    print(d)
    

#dic = {}
#for i, arr in enumerate(arr):
#    dic.setdefault(arr, 'koko')
#print(dic)

d = {}
for a, t in zip(arr, text):
    d['speech'] = a
    d['text']=t
    print(d)

#def func():
#    d = {}
#    for a, t in zip(arr, text):
#        d['speech'] = a
#        d['text']=t
#    return d
#func()

#dic = {}
#for i, arr in enumerate(arr):
#   dic.setdefault(arr, func())
#print(dic)

            /*
            conv.ask([^]*)
            var level = conv.user.storage.level;
            level = 0;
            const days = time(conv, xdays);
            const menu = workout_menu(days, level);
            conv.ask('じゃあ最初は' + menu[0] + 'だよ');
            conv.ask('じゃあ次は' + menu[1] + 'で、最後は' + menu[2] + 'だよ');
            */