# generate TypedDict from dict in clipboard
from pyperclip import paste

d: dict = eval(paste())

def print_types(d, name=None):
    if name is None:
        print('class _ClassName(_TypedDict):')
    else:
        print(f'\n\nclass {name}(_TypedDict):')

    subs = []
    for k, v in d.items():
        vt = type(v)
        if vt is dict:
            name = '_' + k[0].upper() + k[1:]
            subs.append((v, name))
            print(f'    {k}: {name}')
        elif v is None:
            print(f'    {k}: None')
        else:
            print(f'    {k}: {type(v).__name__}')

    for d, name in subs:
        print_types(d, name=name)

print_types(d)
