import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit


class KyelathemePlugin(plugins.SingletonPlugin, toolkit.DefaultDatasetForm):
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.IDatasetForm)

    # IConfigurer

    def update_config(self, config_):
        toolkit.add_template_directory(config_, 'templates')
        toolkit.add_public_directory(config_, 'public')
        toolkit.add_resource('fanstatic', 'kyelatheme')


    def create_package_schema(self):
        #Default schema
        schema = super(KyelathemePlugin, self).create_package_schema()
        #Add 'spatial' field
        schema.update({
            'spatial': [toolkit.get_validator('ignore_missing'),
                        toolkit.get_converter('convert_to_extras')]
        })
        return schema

    def update_package_schema(self):
        #Default schema
        schema = super(KyelathemePlugin, self).update_package_schema()
        #Update 'spatial' field
        schema.update({
            'spatial': [toolkit.get_validator('ignore_missing'),
                        toolkit.get_converter('convert_to_extras')]
        })
        return schema


    def show_package_schema(self):
        #Default schema
        schema = super(KyelathemePlugin, self).show_package_schema()
        schema.update({
            'spatial': [toolkit.get_converter('convert_from_extras'),
            toolkit.get_validator('ignore_missing')]
        })
        return schema


    def is_fallback(self):
        return True


    def package_types(self):
        #Handles no specific types
        return []
