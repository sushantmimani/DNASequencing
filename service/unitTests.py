import unittest
import service


class MyTest(unittest.TestCase):
    #  Shuffled list should not be the same as original list
    def test_shuffle(self):
        self.assertNotEqual(service.shuffle_protein(), service.protein_list)

    # Given pattern is present in only 1 sequence
    def test_find_protein(self):
        self.assertEqual(service.find_protein("CTGGGGAAAGAGTTGGCCCGACGACCGAATCGGTCGCCACCGTCTCTCGGGTGAGTGCCAAAAGAGGAGC"),
                         {'organism': 'Mollivirus sibericum isolate P1084-T', 'list': 'NC_027867'})

        self.assertNotEqual(
            service.find_protein("CTGGGGAAAGAGTTGGCCCGACGACCGAATCGGTCGCCACCGTCTCTCGGGTGAGTGCCAAAAGAGGAGC"),
            {'organism': 'Unavailable', 'list': 'Unavailable'})

        self.assertNotEqual(
            service.find_protein("CTGGGGAAAGAGTTGGCCCGACGACCGAATCGGTCGCCACCGTCTCTCGGGTGAGTGCCAAAAGAGGAGC"),
            {'organism': 'Megavirus', 'list': 'NC_023640'})

        self.assertEqual(service.find_protein("XXXXXX"),
                         {'organism': 'Unavailable', 'list': 'Unavailable'})

    #  A pattern can be present in multiple sequences
    def test_common_dna(self):
        self.assertTrue([{'organism': 'Pithovirus sibericum isolate P1084-T', 'list': 'NC_023423'},
                         {'organism': 'Paramecium bursaria Chlorella virus AR158', 'list': 'NC_009899'},
                         {'organism': 'Bacillus phage G', 'list': 'NC_023719'},
                         {'organism': 'Megavirus', 'list': 'NC_023640'},
                         {'organism': 'Cafeteria roenbergensis virus BV-PW1', 'list': 'NC_014637'},
                         {'organism': 'Paramecium bursaria Chlorella virus 1', 'list': 'NC_000852'},
                         {'organism': 'Acanthocystis turfacea Chlorella virus 1', 'list': 'NC_008724'},
                         {'organism': 'Acanthamoeba polyphaga moumouvirus', 'list': 'NC_020104'},
                         {'organism': 'Mollivirus sibericum isolate P1084-T', 'list': 'NC_027867'}
                         ].__contains__(service.find_protein("AAAAA")))

        self.assertNotEqual(service.find_protein("AAAAA"),
                            {'organism': 'Unavailable', 'list': 'Unavailable'})


if __name__ == '__main__':
    unittest.main()
