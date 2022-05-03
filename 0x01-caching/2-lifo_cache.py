#!/usr/bin/env python3
"""
Module 2-lifo_cache
"""
from re import I
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    Class inherits from BaseCaching
    """
    def __init__(self):
        """Initialization"""
        super().__init__()
        self.__keys = []

    def put(self, key, item):
        """Adds an item to the dict and pops using LIFO"""
        if len(self.cache_data) == self.MAX_ITEMS and key not in self.__keys:
            to_del = self.__keys.pop()
            del self.cache_data[to_del]
            print("DISCARD: {}".format(to_del))

        if key and item:
            self.__keys.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """Retrieves an item by key"""
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
