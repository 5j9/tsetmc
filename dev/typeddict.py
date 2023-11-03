# generate TypedDict from dict or json in clipboard
from pyperclip import paste

pst = paste()
try:
    d: dict = eval(pst)
except NameError:  # name 'null' is not defined
    import json

    d = json.loads(pst)


def print_types(d, name=None):
    if name is None:
        string = '\nclass _ClassName(_TypedDict):\n'
    else:
        string = f'\nclass {name}(_TypedDict):\n'

    subs = []
    for k, v in d.items():
        vt = type(v)
        if vt is dict:
            name = '_' + k[0].upper() + k[1:]
            subs.append((v, name))
            string += f'    {k}: {name}\n'
        elif v is None:
            string += f'    {k}: None\n'
        else:
            string += f'    {k}: {type(v).__name__}\n'

    for d, name in subs:
        print_types(d, name=name)

    print(string)


print_types(d)
