#!/usr/bin/env python

from flask import Flask
from flask_cors import CORS
from flask import request
from flask import Response
from Bio import Entrez
from gevent.wsgi import WSGIServer # For better concurrent request handling
import json
import os
import random

app = Flask(__name__)
CORS(app)
http_server = WSGIServer(('', 5000), app)


# Tell NCBI who you are
Entrez.email = "mimani.s@husky.neu.edu"

# Add ACCESSION Id to this list for all lists that you want to check
protein_list = ['NC_000852', 'NC_007346', 'NC_008724', 'NC_009899', 'NC_014637', 'NC_020104', 'NC_023423',
                'NC_023640', 'NC_023719', 'NC_027867']


#######################################################################################################################
# shuffle_protein : list --> list
# GIVEN : a list of ACCESSION ids
# RETURNS : a shuffled list of ACCESSION ids
# Example

# shuffle_protein(['NC_000852','NC_023719','NC_008724']) --> ['NC_023719','NC_008724','NC_000852']
#######################################################################################################################

def shuffle_protein():
    random.shuffle(protein_list)


#######################################################################################################################
# find_protein : String --> JSON
# GIVEN : a String which represent a DNA sequence
# RETURNS : A JSON object with keys protein and organism

# Example:

# find_protein('AAAAAA') -->    {"organism":"Acanthamoeba polyphaga moumouvirus","list":"NC_020104"}
#######################################################################################################################

def find_protein(dna):
    shuffle_protein()
    response = {}
    for protein in protein_list:
        # If the FASTA file is not available, download the file for future use
        filename = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lists/" + protein)
        if not os.path.isfile(filename):
            net_handle = Entrez.efetch(db="protein", id=protein, rettype="fasta", retmode="text")
            out_handle = open(filename, "w+")
            out_handle.write(net_handle.read())
            out_handle.close()
            net_handle.close()
        with open(filename, 'r') as f:
            data = f.read()
            seq = "".join(data.split('\n')[1:])  # Extract the sequence from file
            header = data.split('\n')[0].split(" ")
            organism = " ".join(header[1:header.__len__() - 2]).replace(",", "")  # Extract the organism name
            if dna in seq: # If sequence match is found
                response["list"] = protein
                response["organism"] = organism
                break
            else:
                response["list"] = "Unavailable"
                response["organism"] = "Unavailable"
            f.close()
    return response

#######################################################################################################################
# search_protein
# GIVEN : Request
# RETURNS : Response
#######################################################################################################################


@app.route('/', methods=['POST'])
def search_protein():
    dna = request.json['dna']
    response = find_protein(dna)
    js = json.dumps(response)
    resp = Response(js, status=200, mimetype='application/json')  # Return the data
    return resp


if __name__ == '__main__':
    http_server.serve_forever()
