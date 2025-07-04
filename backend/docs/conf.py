# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

import os
import sys

# Add the parent directory to the Python path
sys.path.insert(0, os.path.abspath('..'))

# Add specific paths for modules
sys.path.insert(0, os.path.abspath('../models'))
sys.path.insert(0, os.path.abspath('../services'))
sys.path.insert(0, os.path.abspath('../routes'))
sys.path.insert(0, os.path.abspath('../data'))

project = 'SmartSprout'
copyright = '2025, Daniel'
author = 'Daniel Silva'
release = '1.0.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
  "sphinx.ext.autodoc",
  "sphinx.ext.viewcode",
  "sphinx.ext.todo",
  "sphinx.ext.napoleon",
  "sphinx.ext.autosummary",
]

# Napoleon settings for better docstring parsing
napoleon_google_docstring = True
napoleon_numpy_docstring = True
napoleon_include_init_with_doc = False
napoleon_include_private_with_doc = False
napoleon_include_special_with_doc = True
napoleon_use_admonition_for_examples = False
napoleon_use_admonition_for_notes = False
napoleon_use_admonition_for_references = False
napoleon_use_ivar = False
napoleon_use_param = True
napoleon_use_rtype = True
napoleon_preprocess_types = False
napoleon_type_aliases = None
napoleon_attr_annotations = True

# Autodoc settings
autodoc_default_options = {
  'members': True,
  'member-order': 'bysource',
  'special-members': '__init__',
  'undoc-members': True,
  'exclude-members': '__weakref__'
}

# Autosummary settings
autosummary_generate = True

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'  # Changed to a more modern theme
html_static_path = ['_static']

# Theme options
html_theme_options = {
  'canonical_url': '',
  'analytics_id': '',
  'logo_only': False,
  'display_version': True,
  'prev_next_buttons_location': 'bottom',
  'style_external_links': False,
  'vcs_pageview_mode': '',
  'style_nav_header_background': '#2980B9',
  # Toc options
  'collapse_navigation': True,
  'sticky_navigation': True,
  'navigation_depth': 4,
  'includehidden': True,
  'titles_only': False
}