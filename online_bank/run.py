"""
Starts the flask server
"""
from backend import create_app
from backend.config import ProductionConfig
import argparse


def main():
    parser = argparse.ArgumentParser(description='Online bank Project',
                                     epilog='Default: run on local machine, '
                                            'debug on')
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-p', '--production', action='store_true',
                       help='Production mode, debug off')
    args = parser.parse_args()

    production = args.production

    if production:
        print('Using Production Configuration')
        create_app(ProductionConfig).run(threaded=True)
    else:
        print('Using Development Configuration')
        create_app().run(threaded=True,debug=True)


if __name__ == '__main__':
    main()
    
