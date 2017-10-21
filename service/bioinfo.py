from Bio import Entrez
Entrez.email = "mimani.s@husky.neu.edu"
handle = Entrez.efetch(db="protein", id='NC_023719', rettype="fasta", retmode="text")
data = handle.read()
seq = "".join(data.split('\n')[1:])
header = data.split('\n')[0].split(" ")

organism = " ".join(header[1:header.__len__()-2]).replace(",","")
print seq
