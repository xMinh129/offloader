from setuptools import setup, find_packages

setup(
    name='backend',
    version='0.0.1',
    url='https://github.com/xMinh129/offloader.git',
    python_requires='>=2.7',
    packages=find_packages(),
    tests_require=['pytest==3.0.3'],
    install_requires=['pymongo==3.6.1',
                      'Flask==0.12.2',
                      'flask_cors==3.0.3',
                      'requests==2.18.4',
                      'pandas',
                      'numpy',
                      'scikit-learn',
                      'flask-mail'
                      ]
)
