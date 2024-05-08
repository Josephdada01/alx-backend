#!/usr/bin/python3
"""
MRU models
"""
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """
    MRUCache that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """
        Initializes the MRUCache instance.
        """
        super().__init__()

    def put(self, key, item):
        """
        Assigns the item value for the key key.
        If key or item is None, this method will not do anything.
        If the number of items in self.cache_data is higher than MAX_ITEMS:
        the most recently used item (MRU) will be removed.
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Discard the most recently used item
                discard_key = next(reversed(self.cache_data))
                del self.cache_data[discard_key]
                print('DISCARD: {:s}'.format(discard_key))

            # Add or update the item in the cache
            self.cache_data[key] = item

    def get(self, key):
        """
        Returns the value in self.cache_data linked to key.
        If key is None or if the key doesn’t exist in self.cache_data rtn None
        """
        if key is not None and key in self.cache_data:
            # Move the accessed item to the end (most recently used)
            item = self.cache_data.pop(key)
            self.cache_data[key] = item
            return item
        return None
