from setuptools import setup
from os.path import dirname

setup(
    name='tsetmc',
    version='0.7.0',
    long_description=open(
        f'{dirname(__file__)}/README.rst', encoding='utf-8').read(),
    long_description_content_type='text/x-rst',
    description='a library to retrieve data from tsetmc.com website',
    url='https://github.com/5j9/tsetmc',
    author='5j9',
    author_email='5j9@users.noreply.github.com',
    license='GNU General Public License v3 (GPLv3)',
    packages=['tsetmc'],
    python_requires='>=3.9',
    install_requires=['requests', 'jdatetime', 'pandas'],
    tests_require=['pytest'],
    zip_safe=True,
    classifiers=[
        'Intended Audience :: End Users/Desktop',
        'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
        'Programming Language :: Python :: 3.9',
        'Topic :: Internet',
    ],
    keywords='tsetmc client')
