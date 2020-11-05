import unittest
from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
import json

from model.books import BooksModel
from tests.base_test import BaseTest


class UnitTestOfUS(BaseTest):

    # TEST TASK 1
    def test_delete(self):
        with self.app.app_context():
            sinopsis = "For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. But only " \
                       "Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future " \
                       "-- to a dark age of ignorance, barbarism, and warfare that will last thirty thousand years. " \
                       "To preserve knowledge and save mankind, Seldon gathers the best minds in the Empire -- both " \
                       "scientists and scholars -- and brings them to a bleak planet at the edge of the Galaxy to " \
                       "serve as a beacon of hope for a future generations. He calls his sanctuary the " \
                       "Foundation.\nBut soon the fledgling Foundation finds itself at the mercy of corrupt warlords " \
                       "rising in the wake of the receding Empire. Mankind's last best hope is faced with an " \
                       "agonizing choice: submit to the barbarians and be overrun -- or fight them and be destroyed. "
            isbn = 9780553803716
            data = {
                "isbn": isbn,
                "stock": 10,
                "precio": 7.79,
                "titulo": "Foundation",
                "autor": "Isaac Asimov",
                "editorial": "Bantam Books",
                "sinopsis": sinopsis,
                "url_imagen": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1417900846l"
                              "/29579.jpg",
                "fecha_de_publicacion": "2001-06-01"
            }

            res = self.client.delete(f"/book/{isbn}", data=data)
            self.assertEqual(404, res.status_code)

            res = self.client.post("/book", data=data)
            self.assertEqual(201, res.status_code)
            self.assertEqual(BooksModel.find_by_isbn(isbn).json(), json.loads(res.data))

            res = self.client.delete(f"/book/{isbn}", data=data)
            self.assertEqual(200, res.status_code)
            self.assertFalse(BooksModel.find_by_isbn(isbn).vendible)

            res = self.client.delete(f"/book/{isbn}", data=data)
            self.assertEqual(409, res.status_code)


if __name__ == '__main__':
    unittest.main()
