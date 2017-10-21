#!/usr/bin/env python

from flask import Flask
from flask_cors import CORS
from flask import request
from flask import Response
from Bio import Entrez
import json
import os

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def search_protein():
    dna = request.json['dna']
    response = {}
    Entrez.email = "mimani.s@husky.neu.edu"
    protien_list = ['NC_000852', 'NC_007346', 'NC_008724', 'NC_009899', 'NC_014637', 'NC_020104', 'NC_023423',
                    'NC_023640', 'NC_023719', 'NC_027867']

    for protein in protien_list:
        filename = os.path.join(os.path.dirname(os.path.abspath(__file__)),"lists/"+protein)
        if not os.path.isfile(filename):
            net_handle = Entrez.efetch(db="protein", id=protein, rettype="fasta", retmode="text")
            out_handle = open(filename, "w+")
            out_handle.write(net_handle.read())
            out_handle.close()
            net_handle.close()
        with open(filename, 'r') as f:
            data = f.read()
            seq = "".join(data.split('\n')[1:])
            header = data.split('\n')[0].split(" ")
            organism = " ".join(header[1:header.__len__() - 2]).replace(",", "")
            if dna in seq:
                response["list"] = protein
                response["organism"] = organism
                break
            else:
                response["list"] = "Unavailable"
                response["organism"] = "Unavailable"
            f.close()

    js = json.dumps(response)
    resp = Response(js, status=200, mimetype='application/json')
    return resp


if __name__ == '__main__':
    app.run()