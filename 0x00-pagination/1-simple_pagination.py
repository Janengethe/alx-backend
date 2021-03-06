#!/usr/bin/env python3
"""
Module 0-simple_helper_function
"""
import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initialization"""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Uses index_range to find the correct indexes to paginate the dataset
        correctly and return the appropriate page of the dataset
        """
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0
        indx = index_range(page, page_size)
        try:
            return self.dataset()[indx[0]:indx[1]]
        except IndexError:
            return []


def index_range(page: int, page_size: int) -> tuple:
    """
    returns a tuple of size two containing a start index
    and an end index corresponding to the range of indexes
    to return in a list for those particular pagination parameters.
    Page numbers are 1-indexed, i.e. the first page is page 1.
    """
    return ((page - 1) * page_size, page * page_size)
