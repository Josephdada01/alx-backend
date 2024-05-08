#!/usr/bin/python3
"""
MRU caching module
"""
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """
    LRUCache that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """
        Initializes the LRUCache instance.
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        Assigns the item value for the key key.
        If key or item is None, this method will not do anything.
        If the number of items in self.cache_data is higher than MAX_ITEMS:
        the least recently used item (LRU) will be removed.
        """
        if key is None or item is None:
            return

        # If key exists, move it to the end to mark it as most recently used
        if key in self.cache_data:
            self.cache_data.move_to_end(key)
        # If key doesn't exist and cache is full,
        # remove d least recently used item
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            self.cache_data.popitem(last=False)
            print(f"DISCARD: {key}")

        # Add new key-value pair
        self.cache_data[key] = item

    def get(self, key):
        """
        Returns the value in self.cache_data linked to key and marks it as
        most recently used.
        """
        if key is None or key not in self.cache_data:
            return None

        # Move the key to the end to mark it as most recently used
        self.cache_data.move_to_end(key)
        return self.cache_data[key]
