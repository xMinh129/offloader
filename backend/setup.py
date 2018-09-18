from setuptools import setup, find_packages

setup(
    name='backend',
    version='0.0.1',
    url='https://github.com/xMinh129/offloader.git',
    python_requires='>=2.7',
    packages=find_packages(),
    tests_require=['pytest==3.0.3'],
    install_requires=['Flask==0.12.2',
                      'Flask-Script==2.0.6',
                      'flask_cors==3.0.3',
                      'requests==2.19.1'
                      ]
)
