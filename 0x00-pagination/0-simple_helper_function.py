#!/usr/bin/env python3
"""
Module 0-simple_helper_function
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    returns a tuple of size two containing a start index
    and an end index corresponding to the range of indexes
    to return in a list for those particular pagination parameters.
    Page numbers are 1-indexed, i.e. the first page is page 1.
    """
    return ((page - 1) * page_size, page * page_size)
