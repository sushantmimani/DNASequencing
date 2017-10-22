"""
This is a test file to see the working of biopython and Entrez

"""

from Bio import Entrez
import random

Entrez.email = "mimani.s@husky.neu.edu"
protein_list = ['NC_000852', 'NC_007346', 'NC_008724', 'NC_009899', 'NC_014637', 'NC_020104', 'NC_023423',
                'NC_023640', 'NC_023719', 'NC_027867']
random.shuffle(protein_list)
for x in protein_list:
  print x
# handle = Entrez.efetch(db="protein", id='NC_023719', rettype="fasta", retmode="text")
# data = handle.read()
# seq = "".join(data.split('\n')[1:])
# header = data.split('\n')[0].split(" ")
#
# organism = " ".join(header[1:header.__len__()-2]).replace(",","")
# print seq
